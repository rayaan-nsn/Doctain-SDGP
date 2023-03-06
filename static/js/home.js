$(document).ready(function() {

  var userInputArray = [];  // Define an empty array to store user input

  // When user types in the search input field  
  $('#searchTerm').on('keyup', function() {
      var input = $(this).val().toLowerCase();

      //suggestion list
      var suggestions = ['Chest pain', 'shortness of breath', 'fatigue', 'dizziness', 'sweating', 'nausea', 'vomiting', 'lightheadedness',
        'weakness', 'irregular heartbeat', 'headaches', 'blurred vision', 'nosebleeds', 'palpitations', 'feeling of fullness or pressure in chest',
        'leg pain', 'numbness', 'tingling', 'coldness', 'slow healing of wounds', 'swelling in legs and ankles', 'swelling', 'persistent cough',
        'rapid or irregular heartbeat', 'cough', 'fainting', 'fever', 'night sweats', 'weight loss', 'weight gain', 'blood-tinged sputum', 'seizures',
        'sudden loss of consciousness', 'no pulse', 'no breathing', 'swollen ankles and legs', 'extreme thirst', 'frequent urination', 'sudden weight loss',
        'increased hunger', 'dry mouth', 'slow-healing wounds', 'high blood pressure', 'swollen feet and ankles', 'fruity-smelling breath', 'rapid breathing',
        'confusion', 'abdominal pain', 'high fever', 'vision changes', 'dry skin', 'shaking', 'anxiety', 'irritability', 'High blood sugar levels in the morning',
        'floaters', 'blind spots', 'difficulty seeing at night', 'vision loss', 'burning in the hands and feet', 'sharp pains', 'sensitivity to touch', 'loss of coordination',
        'Sores, cuts or blisters that don\'t heal', 'redness', 'thickening of the skin', 'poor circulation', 'dry, itchy skin', 'skin infections', 'patches of dark skin',
        'bleeding gums', 'red or swollen gums', 'bad breath', 'receding gums', 'loose teeth', 'labored breathing', 'acetone breath', 'bloating', 'heartburn', 'reduced sexual desire',
        'reduced sensation in the penis', 'pain', 'chills', 'chest discomfort', 'reduced tolerance for exercise', 'fingernail clubbing', 'swollen lymph nodes', 'skin rash', 'joint pain',
        'coughing up blood', 'pleural effusion', 'pneumonia', 'pulmonary embolism', 'breast lump', 'changes in breast shape or size', 'nipple discharge', 'changes in the skin of the breast',
        'swollen lymph nodes','breast pain', 'difficulty starting or stopping urination', 'weak or interrupted flow of urine', 'blood in urine or semen', 'increased urination', 'pain in the hips',
        'pelvis', 'or lower back', 'changes in bowel habits', 'rectal bleeding or blood in stool', 'abdominal pain or cramps', 'changes in skin color or texture', 'changes in the size',
        'shape or color of a mole', 'a sore that does not heal', 'a spot or lump that bleeds or crusts over', 'abdominal bloating or swelling', 'pelvic pain', 'difficulty eating or feeling full quickly',
        'loss of appetite', 'increased appetite', 'jaundice', 'dark urine', 'foamy or bloody urine', 'light-colored stools', 'frequent infections', 'easy bleeding or bruising', 'itching', 'headaches',
        'seizures', 'difficulty thinking'
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

