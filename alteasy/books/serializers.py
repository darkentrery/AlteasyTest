from rest_framework import serializers

from alteasy.books.models import Book, Profile


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["name", "title", "author", "description", "price"]
        read_only_fields = fields


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["column_name", "is_visible",]
        read_only_fields = fields


class ProfileChangeSerializer(serializers.ModelSerializer):
    # column_name = serializers.CharField
    class Meta:
        model = Profile
        fields = ["column_name", "is_visible",]
