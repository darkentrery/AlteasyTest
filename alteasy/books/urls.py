from django.urls import path

from alteasy.books import views


urlpatterns = [
    path("get-books/", views.GetBooksView.as_view(), name='get-books'),
    path("change-profile/", views.ChangeProfileView.as_view(), name='change-profile'),
]