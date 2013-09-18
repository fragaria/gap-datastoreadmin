from app.settings import settings
from utils.decorators import as_view
from app.template import get_template


@as_view
def index(request, response):
    return get_template("datastoreadmin/index.html").render({
        'project_name': 'Example project',
        'version': settings['version']
    })
