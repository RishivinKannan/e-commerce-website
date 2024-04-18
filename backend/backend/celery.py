# celery.py
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab
from datetime import timedelta

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Create a Celery instance and configure it using the settings from Django
celery_app = Celery('backend')

# Load task modules from all registered Django app configs.
celery_app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks in all installed apps
celery_app.autodiscover_tasks()


celery_app.conf.beat_schedule = {
    'update-prices-task': {
        'task': 'your_app.tasks.update_prices',
        'schedule': timedelta(seconds=5),  # Adjust the schedule as needed
    },
}
