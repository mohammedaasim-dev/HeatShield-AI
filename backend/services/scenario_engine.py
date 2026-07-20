def generate_cooling_scenarios(analysis):

    score = analysis["heat_stress_score"]

    scenarios = []

    if score >= 70:

        scenarios.extend([
            {
                "intervention": "Increase Tree Plantation",
                "expected_temperature_reduction": "2-4°C",
                "priority": "High"
            },
            {
                "intervention": "Install Cool Roofs",
                "expected_temperature_reduction": "1-2°C",
                "priority": "High"
            },
            {
                "intervention": "Increase Green Spaces",
                "expected_temperature_reduction": "2-3°C",
                "priority": "Medium"
            },
            {
                "intervention": "Use Reflective Pavements",
                "expected_temperature_reduction": "1-1.5°C",
                "priority": "Medium"
            }
        ])

    elif score >= 40:

        scenarios.extend([
            {
                "intervention": "Plant Additional Trees",
                "expected_temperature_reduction": "1-2°C",
                "priority": "High"
            },
            {
                "intervention": "Promote Green Roofs",
                "expected_temperature_reduction": "1°C",
                "priority": "Medium"
            },
            {
                "intervention": "Increase Urban Vegetation",
                "expected_temperature_reduction": "1-2°C",
                "priority": "Medium"
            }
        ])

    else:

        scenarios.extend([
            {
                "intervention": "Maintain Existing Green Cover",
                "expected_temperature_reduction": "Minimal",
                "priority": "Low"
            }
        ])

    return scenarios
