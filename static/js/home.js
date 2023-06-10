//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {

   var userInputArray = []; // Define an empty array to store user input

   // When user types in the search input field
   $('#searchTerm').on('keyup', function () {
      var input = $(this).val().toLowerCase();

      //suggestion list
      var suggestions = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain',
         'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination', 'fatigue',
         'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat',
         'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion',
         'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation',
         'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload',
         'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation',
         'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate',
         'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps',
         'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails',
         'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain',
         'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side',
         'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)',
         'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic _patches',
         'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances',
         'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption',
         'fluid_overload', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling',
         'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze'
      ];

      // Filter the suggestions based on the user input
      var filteredSuggestions = suggestions.filter(function (suggestion) {
         return suggestion.toLowerCase().includes(input);
      });

      var suggestionsHtml = ''; // Define an empty string to store the suggestions HTML

      if (input.length > 0) {
         for (var i = 0; i < filteredSuggestions.length; i++) { //If user input is not empty loop through the filtered suggestions
            var suggestion = filteredSuggestions[i]; // Get a suggestion
            var highlightIndex = suggestion.toLowerCase().indexOf(input); // Get the index of the user input within the suggestion
            var highlightedSuggestion = suggestion.slice(0, highlightIndex) + '<span class="highlight">' + suggestion.slice(highlightIndex, highlightIndex + input.length) + '</span>' + suggestion.slice(highlightIndex + input.length); // Highlight the user input within the suggestion using a span with a class of 'highlight'
            suggestionsHtml += '<div class="suggestion">' + highlightedSuggestion + '</div>'; // Add the highlighted suggestion to the suggestions HTML
         }
      }
      $('#suggestionsList').html(suggestionsHtml); // Set the suggestions HTML to the suggestions list element
   });


   // When a suggestion is clicked
   $(document).on('click', '.suggestion', function () {
      var tag = $(this).text(); // Get the text of the clicked suggestion

      // If the tag is not already in the tag list, add it
      if ($('#tagList').find('.tag:contains(' + tag + ')').length == 0) {
         $('#tagList').append('<div class="tag">' + tag + '   <i class="fa-regular fa-circle-xmark close"></i></div>');
      }

      // Clear the search input field and the suggestions list
      $('#searchTerm').val('');
      $('#suggestionsList').empty();

      userInputArray.push(tag); // Add the tag to the user input array

   });


   // When a key is pressed down on the search input field
   $('#searchTerm').on('keydown', function (e) {
      if (e.which === 13) {
         var tag = $(this).val(); // If the key is the Enter key get the value of the search input field

         // If the tag is not already in the tag list, add it
         if ($('#tagList').find('.tag:contains(' + tag + ')').length == 0) {
            $('#tagList').append('<div class="tag">' + tag + '   <i class="fa-regular fa-circle-xmark close"></i></div>');
         }

         // Clear the search input field and the suggestions list
         $(this).val('');
         $('#suggestionsList').empty();

         userInputArray.push(tag); // Add the tag to the user input array
      }
   });


   // When the close button on a tag is clicked remove the tag from the tag list
   $(document).on('click', '.tag .close', function () {
      $(this).parent().remove();
   });


   $('.searchButton').on('click', function () {
      $.ajax({
         type: "POST",
         url: "/user_input",
         data: JSON.stringify(userInputArray),
         contentType: "application/json;charset=UTF-8",
         success: function (response) {
            const predicted_disease = response.predicted_disease;
            $('.container').empty().append(

               `<div class="results-container">
                    <div class='disease-column'>
                        <div class="predicted-disease-tab">
                            <h2 class="">Predicted Disease : &nbsp;&nbsp;&nbsp;&nbsp;</h2>
                            <h2 class="predicted_disease"></h2>
                        </div>
                        <div class="matching-disease-tab">
                            <h2 style="padding-top: 20px; padding-bottom: 10px">Possible Causes</h2>
                            <div class="matching_diseases"></div>
                        </div>
                
<!--                    <h1 class="">Possible Causes</h1>-->
<!--                    <h5>Below are the most likely conditions based on the symptoms and information you entered.</h5>-->
<!--                    <div class="disease-list">-->
<!--                       <div class="predicted_disease"></div>-->
<!--                       <div class="matching_diseases"></div>-->
<!--                    </div>-->
                </div>
                <div class="doctors-column">
                    <h1>Recommended Doctors for ${predicted_disease}</h1>
                    <div class="recommended-doctors"></div>
                </div>
            </div>
            `);


            $('.predicted_disease').append(`<h3 class="diseases" style="color: red">${predicted_disease}</h3>`);

            for (let i = 0; i < response.matching_diseases.length; i++) {
               const matching_diseases = response.matching_diseases[i];
               $('.matching_diseases').append(`<h4 class="matching-disease">${matching_diseases}</h4>`);
            }


            const doctors = response.doctors;
            for (let i = 0; i < doctors.length; i++) {
                 const doctor = doctors[i];
                 $('.recommended-doctors').append(`
                      <div style="display: flex" class="doctor-profile">
                            <div class="doctor-image">
                                <img style="height: 90%; width: 90px" src="../static/images/rayaan/maleDoc.png" alt="doctor">
                            </div>
                            <div class="doctor-info" style="width: 50%; margin-left: 30px">
<!--                            <i class="fa-regular fa-user"></i> &nbsp;-->
                                 <h2> ${doctor.firstname} ${doctor.lastname}</h2>
                                 <p><i class="fa-solid fa-at"></i> &nbsp; ${doctor.email}</p>
                                 <p><i class="fa-solid fa-phone"></i> &nbsp; ${doctor.phonenumber}</p>
                                 <p><i class="fa-solid fa-location-dot"></i> &nbsp; ${doctor.address}</p>
                            </div>
                      </div>
                 `);
            }
          },
          error: function (xhr, status, error) {
            console.log(xhr.responseText);
         }
      });
   });


});