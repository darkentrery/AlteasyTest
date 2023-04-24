from django.urls import path

from alteasy.books import views


urlpatterns = [
    path("get-books/", views.GetBooksView.as_view(), name='get-books'),
    path("change-profile/", views.ChangeProfileView.as_view(), name='change-profile'),
    path("update-books/", views.UpdateBooksView.as_view(), name='update-books'),
    path("create-book/", views.CreateBookView.as_view(), name='create-book'),
    path("delete-books/", views.DeleteBooksView.as_view(), name='delete-books'),
]