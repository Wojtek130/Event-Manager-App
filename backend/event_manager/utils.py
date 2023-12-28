import datetime

from .constants import DATETIME_FORMAT, DATETIME_FORMAT_DB

def format_datatime_from_db(dt):
    dt_obj = datetime.datetime.strptime(dt, DATETIME_FORMAT_DB)
    return dt_obj.strftime(DATETIME_FORMAT)