from google.cloud import language_v1

text = "The other advantage for England over Ireland in terms of evidence is archaeology. A lot more has been done with excavating sites in England. Now by England, we mean literally England, the part that is not Wales, not Scotland, not Ireland, the part of the British Isles. The ensemble, essentially the two islands, are referred to as the British Isles. Britain is England, Scotland and Wales. Ireland is Ireland."

document = language_v1.types.Document(
    content=text, language='en', type_=language_v1.Document.Type.PLAIN_TEXT)

# Instantiates a client
client = language_v1.LanguageServiceClient()

response = client.analyze_entities(
    document=document,
    encoding_type='UTF32'
)

for entity in response.entities:
    if (entity.salience > 0.01 and language_v1.Entity.Type.OTHER != entity.type_) or \
            (entity.salience > 0.1 and language_v1.Entity.Type.OTHER == entity.type_):
        print(entity.name, entity.salience, entity.type_)

    # print('=' * 20)
    # print('         name: {0}'.format(entity.name))
    # print('         type: {0}'.format(entity.type))
    # print('     metadata: {0}'.format(entity.metadata))
    # print('     salience: {0}'.format(entity.salience))
