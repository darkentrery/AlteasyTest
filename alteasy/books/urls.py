from django.urls import path

from alteasy.books import views


urlpatterns = [
    path("get-books/", views.GetBooks.as_view(), name='get-books'),
]