from google.cloud import language_v1
import json
import glob
import base64
import ffmpeg
import requests
import os
import io
import openai
import asyncio
from pdfminer3.converter import TextConverter
from pdfminer3.converter import PDFPageAggregator
from pdfminer3.pdfinterp import PDFPageInterpreter
from pdfminer3.pdfinterp import PDFResourceManager
from pdfminer3.pdfpage import PDFPage
from pdfminer3.layout import LAParams, LTTextBox
from werkzeug.utils import secure_filename
from flask import Flask, flash, request, redirect, url_for, Response, jsonify
from flask_cors import CORS

UPLOAD_FOLDER = './tmp'
ALLOWED_TEXT_EXTENSIONS = {'pdf'}
ALLOWED_VIDEO_EXTENSIONS = {'mp4'}

API_TOKEN = "api_vdYunARWpPXkUGuurgXcsBGHjvfUVRnSQi"
headers = {"Authorization": f"Bearer {API_TOKEN}"}
API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def trim_from_last_period(text):
    """
    Trim all the text in a string following the final period in the string.
    """
    last_period_idx = text.rfind('.')
    trimmed_text = text[:last_period_idx + 1]
    return trimmed_text


def summary_query(payload):
    """
    Generate query to API to summarize text.
    """
    data = json.dumps(payload)
    response = requests.request("POST", API_URL, headers=headers, data=data)
    return json.loads(response.content.decode("utf-8"))


def get_text_keywords(text):
    document = language_v1.types.Document(
        content=text.strip(), language='en', type_=language_v1.Document.Type.PLAIN_TEXT)

    # Instantiates a client
    client = language_v1.LanguageServiceClient()
    response = client.analyze_entities(
        document=document,
        encoding_type='UTF32'
    )

    keywords_array = []
    for entity in response.entities:
        if (entity.salience > 0.01 and language_v1.Entity.Type.OTHER != entity.type_) or \
                (entity.salience > 0.1 and language_v1.Entity.Type.OTHER == entity.type_):
            keywords_array.append(entity.name)
    return list(set(keywords_array))


def get_text_summary(text):
    summary_text_array = summary_query({"inputs": text.strip()})
    summary_text = summary_text_array[0]['summary_text']
    return summary_text


def get_text_category(text):
    """Classify the input text into categories. """

    language_client = language_v1.LanguageServiceClient()

    document = language_v1.Document(
        content=text.strip(), type_=language_v1.Document.Type.PLAIN_TEXT
    )
    response = language_client.classify_text(request={'document': document})
    categories = response.categories
    categories.sort(key=lambda category: category.confidence)
    if len(categories) > 0:
        return categories[0].name
    return "N/A"


async def get_text_keywords_and_summaries(text):
    keywords = get_text_keywords(text)
    summary = get_text_summary(text)
    category = get_text_category(text)

    return {'text': text.replace('\n', ''), 'keywords': keywords, 'summary': summary, 'category': category}


def allowed_text_file(filename):
    """
    Check if filename is in allowed text extensions.
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_TEXT_EXTENSIONS


def allowed_video_file(filename):
    """
    Check if filename is in allowed video extensions.
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_VIDEO_EXTENSIONS


def read_video_file(filename):
    from google.cloud import speech
    # convert mp4 to audio file
    stream = ffmpeg.input(filename)
    audio_filename = filename[:filename.rindex('.')] + '.mp3'
    stream = ffmpeg.output(
        stream, audio_filename)
    ffmpeg.run(stream)

    with io.open(audio_filename, 'rb') as audio_file:
        content = audio_file.read()

    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(content=content)

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.ENCODING_UNSPECIFIED,
        sample_rate_hertz=16000,
        language_code="en-US",
    )

    response = client.recognize(config=config, audio=audio)

    split_text = []

    for i, result in enumerate(response.results):
        alternative = result.alternatives[0]
        split_text.append(alternative.transcript)

    api_responses = asyncio.run(
        async_get_text_keywords_and_summaries(split_text))
    return api_responses


def read_text_file(filename):
    resource_manager = PDFResourceManager()
    fake_file_handle = io.StringIO()
    converter = TextConverter(
        resource_manager, fake_file_handle, laparams=LAParams())
    page_interpreter = PDFPageInterpreter(resource_manager, converter)

    with open(filename, 'rb') as fh:

        for page in PDFPage.get_pages(fh,
                                      caching=True,
                                      check_extractable=True):
            page_interpreter.process_page(page)

        text = fake_file_handle.getvalue()

    converter.close()
    fake_file_handle.close()

    split_text = text.split('\n\n')
    del split_text[-1]

    api_responses = asyncio.run(
        async_get_text_keywords_and_summaries(split_text))
    return api_responses


async def async_get_text_keywords_and_summaries(text_array):
    """
    Async function thats gets keywords and summaries for multiple strings of texts.
    """
    args = (get_text_keywords_and_summaries(text)
            for text in text_array if len(text) > 3)
    return await asyncio.gather(*args)


def delete_tmp_files():
    """
    Delete all files from the tmp folder.
    """
    files = glob.glob('./tmp/*')
    for f in files:
        os.remove(f)


@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    if request.method == 'POST' and file:
        filename = secure_filename(file.filename)
        print(filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        if allowed_text_file(file.filename):
            api_responses = read_text_file(UPLOAD_FOLDER + '/' + filename)
        elif allowed_video_file(file.filename):
            api_responses = read_video_file(UPLOAD_FOLDER + '/' + filename)
        else:
            # Unprocessable Entity
            return Response(status=422)

        delete_tmp_files()
        return jsonify(api_responses)
