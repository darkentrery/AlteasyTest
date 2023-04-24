from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from django.utils.translation import gettext_lazy as _


class Book(models.Model):
    name = models.CharField(_("Name"), max_length=20)
    title = models.CharField(_("Title"), max_length=30)
    author = models.CharField(_("Author"), max_length=30)
    description = models.TextField(_("Description"), max_length=512, blank=True, null=True)
    price = models.IntegerField(_("Price"), validators=[MinValueValidator(0), MaxValueValidator(5)])

    class Meta:
        verbose_name = "Book"
        verbose_name_plural = "Books"

    def __str__(self):
        return f"{self.name} - {self.title}"


class Profile(models.Model):
    column_name = models.CharField(_("Column name"), max_length=20)
    is_visible = models.BooleanField(_("Is Visible"), default=True)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"

    def __str__(self):
        return f"{self.column_name}"
