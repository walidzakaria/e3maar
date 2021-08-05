from django.contrib import admin

# Register your models here.
# from .forms import MainInfoForm
from .models import MainCategory, Category, Project


class MainCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'main_category')


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_main_category', 'category',)

    def get_main_category(self, obj):
        return obj.main_category.main_category

    get_main_category.short_description = 'Main Category'
    get_main_category.admin_order_field = 'main_category'


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_category', 'project_name', 'picture_name', 'picture', 'show_in_home',)
    list_filter = ('category__category', 'show_in_home',)

    def get_category(self, obj):
        return obj.category.category

    get_category.short_description = 'Category'
    get_category.admin_order_field = 'category'


admin.site.register(Category, CategoryAdmin)
admin.site.register(MainCategory, MainCategoryAdmin)
admin.site.register(Project, ProjectAdmin)

