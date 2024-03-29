import re

def format_document(text):
    text = re.sub(r"[\r\n\t]+", " ", text)  # Remove newlines and tabs
    text = re.sub(r"\\u\d{4}", "", text)  # Remove Unicode escape sequences

    # Step 3: Sentence Segmentation
    sentences = re.split(r"(?<=[.!?]) +", text)

    # Step 4: Passage Chunking (using a sliding window of 3 sentences)
    passages = []
    for i in range(len(sentences) - 2):
        passage = " ".join(sentences[i : i + 3])
        passages.append(passage)

    # Step 5: Convert to List of Strings
    document_chunks = passages

    return document_chunks
