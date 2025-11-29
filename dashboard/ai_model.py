def get_ai_recommendation(temp, moisture, ph, pest):
    """
    Rule-based recommendations for rice cultivation.
    Includes thresholds for temp, moisture, pH, pest, and dynamic NPK fertilizer requirements.
    """

    recommendations = []

    # 🌡️ Temperature
    if temp < 21:
        recommendations.append("⚠️ Temperature is too low. Consider cold-tolerant rice varieties or delayed planting.")
    elif temp > 37:
        recommendations.append("⚠️ Temperature is too high. Increase irrigation and consider heat-tolerant varieties.")
    else:
        recommendations.append("✅ Temperature is within the optimal range (21–37°C).")

    # 💧 Moisture
    if moisture < 30:
        recommendations.append("⚠️ Moisture is too low. Increase irrigation or improve water retention.")
    elif moisture > 70:
        recommendations.append("⚠️ Moisture is too high. Improve drainage to prevent waterlogging.")
    else:
        recommendations.append("✅ Moisture is within the optimal range (30–70%).")

    # 🧪 Soil pH
    if ph < 5.0:
        recommendations.append("⚠️ Soil is too acidic. Apply lime to raise pH.")
    elif ph > 7.5:
        recommendations.append("⚠️ Soil is too alkaline. Apply gypsum or organic matter to lower pH.")
    else:
        recommendations.append("✅ Soil pH is within the optimal range (5.0–7.5).")

    # 🐛 Pest Infestation
    if pest == 0:
        recommendations.append("✅ No pest infestation detected. Continue monitoring regularly.")
    elif pest <= 20:
        recommendations.append("⚠️ Mild pest infestation. Use biological or cultural control methods.")
    else:
        recommendations.append("⚠️ Severe pest infestation. Apply integrated pest management (IPM) strategies.")

    # 🌱 Dynamic NPK Fertilizer Requirement
    npk_recommendation = "🌱 NPK Fertilizer Requirement:\n"

    # Nitrogen (N)
    if pest > 20:
        npk_recommendation += "- Nitrogen (N): Reduce to ~80–90 kg/ha to avoid lush growth that worsens pest problems.\n"
    elif temp < 21 or temp > 37:
        npk_recommendation += "- Nitrogen (N): Apply ~90–100 kg/ha; extreme temps reduce uptake efficiency.\n"
    else:
        npk_recommendation += "- Nitrogen (N): 100–120 kg/ha, split into 3 doses (basal, tillering, panicle initiation).\n"

    # Phosphorus (P2O5)
    if ph < 5.5:
        npk_recommendation += "- Phosphorus (P2O5): Increase to ~60–70 kg/ha (acidic soils bind P).\n"
    elif ph > 7.5:
        npk_recommendation += "- Phosphorus (P2O5): Increase to ~70–80 kg/ha (alkaline soils reduce P availability).\n"
    else:
        npk_recommendation += "- Phosphorus (P2O5): 40–60 kg/ha, applied as basal dose before transplanting.\n"

    # Potassium (K2O)
    if moisture > 70:
        npk_recommendation += "- Potassium (K2O): Increase to ~60–70 kg/ha to strengthen plants against waterlogging stress.\n"
    else:
        npk_recommendation += "- Potassium (K2O): 40–60 kg/ha, applied in 2 splits (basal and panicle initiation).\n"

    npk_recommendation += "- Always adjust based on soil test results and local recommendations.\n"

    # 👨‍🌾 Integrated Action Plan
    action_plan = """
    👨‍🌾 Integrated Action Plan:
    - Maintain irrigation and soil fertility.
    - Monitor pest levels weekly.
    - Use crop rotation and organic amendments for long-term soil health.
    - Apply NPK fertilizers dynamically based on current conditions.
    """

    return "\n".join(recommendations) + "\n\n" + npk_recommendation + "\n" + action_plan
