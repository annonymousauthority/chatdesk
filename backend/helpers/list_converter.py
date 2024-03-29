import ast


def list_to_string(lst):
    """Converts a List[List[float]] to a string representation"""
    return str(lst)


def string_to_list(string):
    """Converts a string representation back to List[List[float]]"""
    return ast.literal_eval(string)
