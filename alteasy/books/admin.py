from django.contrib import admin

from alteasy.books.models import Book, Profile


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "title",
        "author",
        "price",
    ]


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = [
        "column_name",
        "is_visible",
    ]
