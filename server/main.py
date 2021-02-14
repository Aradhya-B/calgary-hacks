from google.cloud import language_v1
import json
import requests
from pdfminer3.converter import TextConverter
from pdfminer3.converter import PDFPageAggregator
from pdfminer3.pdfinterp import PDFPageInterpreter
from pdfminer3.pdfinterp import PDFResourceManager
from pdfminer3.pdfpage import PDFPage
from pdfminer3.layout import LAParams, LTTextBox
from werkzeug.utils import secure_filename
from flask import Flask, flash, request, redirect, url_for, Response, jsonify
from flask_cors import CORS
import os
import io
import openai
import asyncio

# openai.api_key = os.environ["OPENAI_API_KEY"]

UPLOAD_FOLDER = './tmp'
ALLOWED_EXTENSIONS = {'txt', 'pdf'}

API_TOKEN = "api_vdYunARWpPXkUGuurgXcsBGHjvfUVRnSQi"
headers = {"Authorization": f"Bearer {API_TOKEN}"}
API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def trim_from_last_period(text):
    last_period_idx = text.rfind('.')
    trimmed_text = text[:last_period_idx + 1]
    return trimmed_text


def summary_query(payload):
    data = json.dumps(payload)
    response = requests.request("POST", API_URL, headers=headers, data=data)
    return json.loads(response.content.decode("utf-8"))


async def get_text_keywords(text):
    # TODO: Refine prompt with more examples
    # keywords_prompt = "Text: The other advantage for England over Ireland in terms of evidence is archaeology. A lot more has been done with excavating sites in England. Now by England, we mean literally England, the part that is not Wales, not Scotland, not Ireland, the part of the British Isles. The ensemble, essentially the two islands, are referred to as the British Isles. Britain is England, Scotland and Wales. Ireland is Ireland.\nKeywords: archaeology, England, ensemble, Britain, Ireland\nText: Bede wrote, among other things, A History of the English Church and People, which is full of miracles and very, very pro-Christian, as much as Gregory of Tours. But it is a much more easy -to-follow narrative, and a narrative with a certain kind of point. It’s about the conversion of England and the establishment of the Church.\nKeywords: Bede, History of the English Church and People\nText: " + \
    #     text.strip() + "\nKeywords:"

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

    # summary_prompt = text.strip() + "\ntl;dr:"
    # keyword_response = openai.Completion.create(
    #     engine="davinci",
    #     prompt=keywords_prompt,
    #     temperature=0.5,
    #     max_tokens=60,
    #     top_p=1,
    #     frequency_penalty=0.8,
    #     presence_penalty=0,
    #     stop=["\n"]
    # )
    # summary_response = openai.Completion.create(
    #     engine="davinci",
    #     prompt=summary_prompt,
    #     temperature=0.3,
    #     max_tokens=int(len(text)/8),
    #     top_p=1,
    #     frequency_penalty=0,
    #     presence_penalty=0,
    # )

    # keywords_array = keyword_response['choices'][0]['text'].strip().split(',')
    # for keyword in keywords_array:
    #     keyword.strip()
    # summary_text = summary_response['choices'][0]['text']
    # trimmed_summary_text = trim_from_last_period(
    #     summary_text).replace('\n', '')
    summary_text = summary_query({"inputs": text.strip()})
    return {'text': text.replace('\n', ''), 'keywords': list(set(keywords_array)), 'summary': summary_text}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def read_file(filename):
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

# close open handles
    converter.close()
    fake_file_handle.close()

    split_text = text.split('\n\n')
    del split_text[-1]

    gpt3_responses = asyncio.run(async_get_text_keywords(split_text))
    return gpt3_responses
    # keywords = []
    # summaries = []
    # for responses in gpt3_responses:
    #     response_text = responses['keywords']
    #     this_keywords = response_text.split(',')
    #     summary = responses['summary']
    #     for this_keyword in this_keywords:
    #         keywords.append(this_keyword.strip())
    #     summaries.append(summary)
    # keywords_set = set(keywords)
    # for summary in summaries:
    #     print('----------------------------------------------------------------')
    #     print(summary)
    #     print('----------------------------------------------------------------')

    # print(get_text_keywords(text))


async def async_get_text_keywords(text_array):
    args = (get_text_keywords(text) for text in text_array if len(text) > 3)
    return await asyncio.gather(*args)


@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    if request.method == 'POST':
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            print(filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            api_responses = read_file(UPLOAD_FOLDER + '/' + filename)

            return jsonify(api_responses)
