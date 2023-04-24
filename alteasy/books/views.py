from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from alteasy.books.models import Book, Profile
from alteasy.books.serializers import BookSerializer, ProfileSerializer, ProfileChangeSerializer


class IndexView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'index.html'

    def get(self, request, **kwargs):
        return Response({})


class GetBooksView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        books = BookSerializer(Book.objects.all(), many=True)
        profiles = ProfileSerializer(Profile.objects.all(), many=True)
        return Response({"books": books.data, "profiles": profiles.data}, status=status.HTTP_200_OK)


class ChangeProfileView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, format='json'):
        profile = Profile.objects.get(column_name=request.data["column_name"])
        serializer = ProfileChangeSerializer(instance=profile, data=request.data)
        if serializer.is_valid():
            profile = serializer.save()
            profiles = ProfileSerializer(Profile.objects.all(), many=True)
            return Response(profiles.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_200_OK)
