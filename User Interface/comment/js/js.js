$(function(){
  var inDexValue;
  
    $('#button2').click( function() {
      if($('#userCmnt').val().length == ''){
       alert('Please Enter Your Comment');
       return true;
      }
      var userCmnt = $('#userCmnt').val();
      if($('#submit').hasClass('editNow')){
                 
        $('#cmntContr>div.viewCmnt').eq(inDexValue).children('p').html(userCmnt);
        
      }else{      
    
    $('#cmntContr').append("<div class='viewCmnt'><p>"+ userCmnt + "</p><span class='edit'></span><span class='delete'></span></div>");
     }
      $('#userCmnt').val('');
      $(this).removeClass('editNow');
  });
    
  
  // Edit
  $('#cmntContr').on('click', '.edit', function(){

    
  });
  });