$(document).ready(function() {

  var userInputArray = [];  // Define an empty array to store user input

  // When user types in the search input field  
  $('#searchTerm').on('keyup', function() {
      var input = $(this).val().toLowerCase();

      //suggestion list
      var suggestions = [  "Chest pain", "Shortness of breath", "Fatigue", "Dizziness", "Sweating", "Nausea",
          "Vomiting", "Lightheadedness", "Weakness", "Irregular heartbeat", "Headaches", "Blurred vision", "Distorted vision",
          "Nosebleeds", "Palpitations", "Feeling of fullness or pressure in chest", "Leg pain", "Numbness", "Tingling",
          "Coldness", "Slow healing of wounds", "Swelling in legs and ankles", "Swelling", "Persistent cough",
          "Rapid or irregular heartbeat", "Cough", "Fainting", "Fever", "Night sweats", "Weight loss", "Weight gain",
          "Blood-tinged sputum", "Seizures", "Sudden loss of consciousness", "No pulse", "No breathing",
          "Stiffness or tightness in the joints of the hands", "Swollen ankles and legs", "Extreme thirst",
          "Frequent urination", "Sudden weight loss", "Increased hunger", "Dry mouth", "Slow-healing wounds",
          "High blood pressure", "Swollen feet and ankles", "Fruity-smelling breath", "Rapid breathing", "Confusion",
          "Abdominal pain", "High fever", "Vision changes", "Dry skin", "Shaking", "Anxiety", "Irritability",
          "High blood sugar levels in the morning", "Floaters", "Blind spots", "Difficulty seeing at night", "Vision loss",
          "Burning in the hands and feet", "Difficulty seeing colors", "Sharp pains", "Sensitivity to touch",
          "Loss of coordination", "Sores, cuts, or blisters that don't heal", "Redness", "Thickening of the skin",
          "Poor circulation", "Dry, itchy skin", "Skin infections", "Patches of dark skin", "Bleeding gums",
          "Red or swollen gums", "Unconsciousness", "Bad breath", "Receding gums", "Loose teeth", "Labored breathing",
          "Acetone breath", "Bloating", "Heartburn", "Difficulty achieving or maintaining an erection", "Reduced sexual desire",
          "Reduced sensation in the penis", "Pain, warmth or discharge from the affected area",
          "High levels of triglycerides and low-density lipoprotein (LDL) cholesterol",
          "Low levels of high-density lipoprotein (HDL) cholesterol", "Patches of light brown or scaly skin",
          "Small raised bumps that look like pimples", "Inability to fully extend the fingers", "Thick, tight skin on the hands",
          "chills", "chest discomfort", "reduced tolerance for exercise", "fingernail clubbing", "swollen lymph nodes",
          "skin rash", "joint pain", "coughing up blood", "pleural effusion", "pneumonia", "pulmonary embolism", "breast lump",
          "changes in breast shape or size", "nipple discharge", "changes in the skin of the breast", "swollen lymph nodes",
          "breast pain", "difficulty starting or stopping urination", "weak or interrupted flow of urine", "blood in urine or semen",
          "increased urination", "pain in the hips, pelvis, or lower back", "changes in bowel habits", "rectal bleeding or blood in stool",
          "abdominal pain or cramps", "changes in skin color or texture", "changes in the size, shape or color of a mole",
          "a sore that does not heal", "a spot or lump that bleeds or crusts over", "abdominal bloating or swelling", "pelvic pain",
          "difficulty eating or feeling full quickly", "loss of appetite", "increased appetite", "jaundice", "dark urine",
          "foamy or bloody urine", "light-colored stools", "frequent infections", "easy bleeding or bruising", "itching", "headaches",
          "seizures", "difficulty thinking", "weakness or paralysis in one part of the body", "personality or behavior changes",
          "difficulty swallowing", "hoarseness", "feeling full after eating a small amount of food", "anemia", "back or pelvic pain",
          "lump in the neck", "pain in the throat or neck", "feeling of heaviness in the scrotum", "vaginal bleeding after menopause",
          "abnormal vaginal bleeding between periods", "pain during intercourse", "pain in the bone or joint", "swelling in the affected area",
          "fractures with little or no trauma", "sore or lump in the mouth, tongue or lip", "changes in the color or texture of the mouth or lips",
          "coughing up blood", "muscle weakness", "increased hair growth", "wheezing", "chronic cough with mucus", "cough with mucus",
          "difficulty breathing", "chest discomfort", "dry cough", "chest infections", "poor growth", "bowel obstruction", "erectile dysfunction",
          "Abdominal pain or discomfort", "light-colored stools", "indigestion", "Blood in urine", "painful or frequent urination",
          "swelling in the feet", "Abdominal pain or swelling", "hoarseness or voice changes", "recurring respiratory infections",
          "Lump or swelling in the testicle", "hiccups", "pain or discomfort in the testicle or scrotum", "feeling of heaviness in the scrotum",
          "back pain", "Loud snoring", "excessive daytime sleepiness", "restless sleep", "abnormal vaginal discharge",
          "Swelling or lump in the affected area", "Bone pain or tenderness", "thirst", "changes in the color or texture of the skin",
          "difficulty chewing swallowing or speaking", "chronic cough", "Lump or sore that does not heal", "difficulty swallowing or speaking",
          "changes in the voice or hoarseness", "pain in the ear, face or neck", "chest tightness", "difficulty breathing"
      ];

      // Filter the suggestions based on the user input
      var filteredSuggestions = suggestions.filter(function(suggestion) {
        return suggestion.toLowerCase().includes(input);
      });

      var suggestionsHtml = ''; // Define an empty string to store the suggestions HTML

      if (input.length > 0) {
        for (var i = 0; i < filteredSuggestions.length; i++) {  //If user input is not empty loop through the filtered suggestions
          var suggestion = filteredSuggestions[i];  // Get a suggestion
          var highlightIndex = suggestion.toLowerCase().indexOf(input); // Get the index of the user input within the suggestion
          var highlightedSuggestion = suggestion.slice(0, highlightIndex) + '<span class="highlight">' + suggestion.slice(highlightIndex, highlightIndex + input.length) + '</span>' + suggestion.slice(highlightIndex + input.length); // Highlight the user input within the suggestion using a span with a class of 'highlight'
          suggestionsHtml += '<div class="suggestion">' + highlightedSuggestion + '</div>'; // Add the highlighted suggestion to the suggestions HTML
        }
      }
      $('#suggestionsList').html(suggestionsHtml);  // Set the suggestions HTML to the suggestions list element
    });
  

    // When a suggestion is clicked
    $(document).on('click', '.suggestion', function() {
      var tag = $(this).text(); // Get the text of the clicked suggestion

      // If the tag is not already in the tag list, add it
      if ($('#tagList').find('.tag:contains(' + tag + ')').length == 0) {
        $('#tagList').append('<div class="tag">' + tag + '&nbsp;&nbsp;&nbsp;<i class="fa-regular fa-circle-xmark close"></i></div>');
      }

      // Clear the search input field and the suggestions list
      $('#searchTerm').val('');
      $('#suggestionsList').empty();

      userInputArray.push(tag); // Add the tag to the user input array

    });



  // When a key is pressed down on the search input field
    $('#searchTerm').on('keydown', function(e) {
      if (e.which === 13) {
        var tag = $(this).val();  // If the key is the Enter key get the value of the search input field

        // If the tag is not already in the tag list, add it
        if ($('#tagList').find('.tag:contains(' + tag + ')').length == 0) {
            $('#tagList').append('<div class="tag">' + tag + '&nbsp;&nbsp;&nbsp;<i class="fa-regular fa-circle-xmark close"></i></div>');
        }

        // Clear the search input field and the suggestions list
        $(this).val('');
        $('#suggestionsList').empty();

        userInputArray.push(tag); // Add the tag to the user input array
      }
    });

  
    // When the close button on a tag is clicked remove the tag from the tag list
    $(document).on('click', '.tag .close', function() {
      $(this).parent().remove();
    });


  $('.searchButton').on('click', function() {
    $.ajax({
      type: "POST",
      url: "/user_input",
      data: JSON.stringify(userInputArray),
      contentType: "application/json;charset=UTF-8",
      success: function(response) {
        $('.container').empty().append(

            `<div class="results-container">
                <div class='disease-column'>
                    <h1 class="">Possible Causes</h1>
                    <div class="possible-diseases"></div>
                </div>
                <div class="doctors-column">
                    <h1>Recommended Doctors</h1>
                    <div class="recommended-doctors">
</div>
                </div>
            </div>
            `);

        for (let i = 0; i < response.disease.length; i++) {
          const disease = response.disease[i];
          $('.possible-diseases').append(`<p class="disease">${disease}</p>`);
        }
        for (let i = 0; i < response.doctors.length; i++) {
          const doctors = response.doctors[i];
          $('.recommended-doctors').append(`
              <div class="doctor-profile">
                <h6></h6>
                <p>${doctors}</p>
              </div>
          `);
        }
      },
      error: function(xhr, status, error) {
        console.log(xhr.responseText);
      }
    });
  });


    
});

