from django.shortcuts import render
from .ai_model import get_ai_recommendation

def home(request):
    return render(request, "home.html")

def predict(request):
    try:
        temp = float(request.GET.get("temp", 25))
        moisture = float(request.GET.get("moisture", 50))
        ph = float(request.GET.get("ph", 6.5))
        pest = float(request.GET.get("pest", 0))

        recommendation = get_ai_recommendation(temp, moisture, ph, pest)

        return render(request, "home.html", {
            "recommendation": recommendation,
            "temp": temp,
            "moisture": moisture,
            "ph": ph,
            "pest": pest
        })

    except Exception as e:
        return render(request, "home.html", {
            "recommendation": f"⚠️ Error: {str(e)}"
        })
