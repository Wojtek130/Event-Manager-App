from django.http import JsonResponse

def index(request):
    return JsonResponse(data={"hello" : "world"})


