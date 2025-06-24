from django.urls import path
from .  import views

urlpatterns=[
    path('Expdata/',views.EData,name = 'Expdata'),
    path('EArkoData/<int:pk>', views.EArkoData, name= 'EArkoData'),

]