from typing import Optional
from fastapi import FastAPI
from PIL import Image
import pytesseract
from googletrans import Translator


app = FastAPI()
translator = Translator()

@app.get('/')
def read_root():
    return {'Hello': 'World'}

@app.get('/items/{item_id}')
def read_item(item_id: int, q: Optional[str] = None):
    return {'item_id': item_id, 'q': q}

@app.get('/images')
def read_image():
    try:
        img = Image.open('./0.rawkuma.com.jpg')
        result = pytesseract.image_to_string(img)
        k = translator.translate(result, dest='french')
        translated = str(k.text)
        return {'translation': translated}
    except ValueError as e:
        return {'error': e}
