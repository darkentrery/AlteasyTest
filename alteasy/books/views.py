from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from alteasy.books.models import Book
from alteasy.books.serializers import BookSerializer


class IndexView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'index.html'

    def get(self, request, **kwargs):
        return Response({})


class BooksView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format='json', **kwargs):
        supplies = BookSerializer(Book.objects.all(), many=True)
        return Response(supplies.data, status=status.HTTP_200_OK)
