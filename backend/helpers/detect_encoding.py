import chardet


def detect_encoding(raw_data):
    # Convert binary data to string using UTF-8
    text_content = raw_data.decode("utf-8", errors="replace")

    # Use chardet to detect encoding of the converted text
    result = chardet.detect(text_content.encode("utf-8"))
    encoding = result["encoding"]
    confidence = result["confidence"]

    print(f"Detected Encoding: {encoding} with confidence: {confidence}")
