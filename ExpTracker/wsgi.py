"""
WSGI config for ExpTracker project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

settings_model = 'ExpTracker.demployment' if 'WEBSITE_HOSTNAME' in os.environ else 'ExpTracker.settings'

os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_model)

application = get_wsgi_application()
