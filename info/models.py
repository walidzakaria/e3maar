import sys

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from io import BytesIO
from PIL import Image


class MainCategory(models.Model):
    main_category = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.main_category

    class Meta:
        verbose_name_plural = 'Main Categories'


class Category(models.Model):
    main_category = models.ForeignKey(MainCategory, on_delete=models.CASCADE)
    category = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.category

    class Meta:
        verbose_name_plural = 'Categories'


class Project(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    project_name = models.CharField(max_length=50)
    picture_name = models.CharField(max_length=50)
    picture = models.ImageField()
    show_in_home = models.BooleanField(default=False)

    def save(self):
        img = Image.open(self.picture)
        img = img.convert('RGB')
        output = BytesIO()
        width_ratio = (800 / float(img.size[0]))
        h_size = int((float(img.size[1]) * float(width_ratio)))
        img = img.resize((800, h_size), Image.LANCZOS)
        img.save(output, format='jpeg', quality=80)
        output.seek(0)
        self.picture = InMemoryUploadedFile(
            output,
            'ImageField', f'{self.picture.name.split(".")[0]}.jpg',
            'image/jpeg',
            sys.getsizeof(output),
            None
        )
        super(Project, self).save()

    def __str__(self):
        return self.picture_name
