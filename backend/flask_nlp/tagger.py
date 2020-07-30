import pickle
import gzip


sourceName = __file__
sourceName = sourceName.replace("tagger.py", "compressed_model.data")


with gzip.open(sourceName, 'rb') as fh:
    model = pickle.load(fh)


def features(sentence, index):

    return {
        'word': sentence[index],
        'is_first': index == 0,
        'is_last': index == len(sentence) - 1,
        'is_capitalized': sentence[index][0].upper() == sentence[index][0],
        'is_all_caps': sentence[index].upper() == sentence[index],
        'is_all_lower': sentence[index].lower() == sentence[index],
        'prefix-1': sentence[index][0],
        'prefix-2': sentence[index][:2],
        'prefix-3': sentence[index][:3],
        'suffix-1': sentence[index][-1],
        'suffix-2': sentence[index][-2:],
        'suffix-3': sentence[index][-3:],
        'prev_word': '' if index == 0 else sentence[index - 1],
        'next_word': '' if index == len(sentence) - 1 else sentence[index + 1],
        'has_hyphen': '-' in sentence[index],
        'is_numeric': sentence[index].isdigit(),
        'capitals_inside': sentence[index][1:].lower() != sentence[index][1:]
    }


def pos_tag(sentence):
    tags = model.predict([features(sentence, index)
                          for index in range(len(sentence))])
    return zip(sentence, tags)


def transform_to_dataset(tagged_sentences):
    X = []
    for tagged in tagged_sentences:
        for index in range(len(tagged)):
            X.append(features(tagged, index))
    return X


def exec(text):
    sentence = []
    for word in text.split(' '):
        sentence.append(word)
    tags = tuple(pos_tag(sentence))
    result = ''
    for word, tag in tags:
        result += word + '/'+tag + ' '
    return result
