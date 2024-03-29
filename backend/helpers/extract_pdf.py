import io

import PyPDF2


def extract_text_from_pdf(pdf_content):
    pdf_text = ""

    # Use an in-memory file-like object
    with io.BytesIO(pdf_content) as file:
        pdf_reader = PyPDF2.PdfReader(file)
        num_pages = len(pdf_reader.pages)

        for page_num in range(num_pages):
            page = pdf_reader.pages[page_num]
            pdf_text += page.extract_text()

    return pdf_text.encode("utf-8", errors="ignore").decode("utf-8")
