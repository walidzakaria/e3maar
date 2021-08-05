from django.db import models


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

    def __str__(self):
        return self.picture_name
