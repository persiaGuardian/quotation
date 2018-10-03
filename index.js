
$.get('http://json.invite-comm.jp/api/json/monthly', function(files){
    if(files){
        var tr = "";
        var sumOfAmounts = 0;
        var tax = 0;
        var monthlyCosts = 0;
        for(var i=0; i < files.length; i++){
            tr += '<tr><td class="item-number">' + files[i].item + '</td>' + '<td onclick="editable(this)">' + files[i].desc + '</td>' + '<td class="numbers" onclick="editable(this)">' +
             files[i].qty + '</td>' + '<td  onclick="editable(this)">' + files[i].unit + '</td>' + '<td class="numbers price" onclick="editable(this)"><i class="fa fa-yen"></i> ' + files[i].price + '</td>' + 
            '<td class="month-amount"><i class="fa fa-yen"></i> ' + files[i].amount + '</td>' + '<td onclick="editable(this)">' + files[i].comment + '</td><td><div class="form-inline"><div class="form-group"><button onclick="delete_row(this)" class="btn btn-alert"><i class="fa fa-trash" aria-hidden="true"></i></button></div></div></td></tr>';
            sumOfAmounts += files[i].amount;
        }
        tax = sumOfAmounts * 0.08;
        monthlyCosts = (sumOfAmounts + tax);
        var sum_tr = '<tbody><tr><td>#</td><td>Consumption Tax</td><td>1</td><td>8%</td><td class="month-tax"><i class="fa fa-yen"></i> ' + sumOfAmounts + '</td><td class="month-tax"><i class="fa fa-yen"></i> ' + tax + '</td><td colspan="2"></td></tr>';
        sum_tr += '<tr><td colspan="4" class="text-center">Monthly Costs:</td><td class="text-center monthly-cost" colspan="4"></td></tr></tbody>';
        $('#monthly_tbl').find("tbody").append(tr);
        $('#monthly_tbl').append(sum_tr);
        $('.monthly-cost').html('<i class="fa fa-yen"></i> ' +  monthlyCosts.toString());
        $('#monthly_tbl').dataTable({
            "searching": false,
            "bPaginate": false,
            "bLengthChange": true,
            "bFilter": true,
            "bInfo": false,
            "bAutoWidth": false,
            "createdRow": function(row, data, dataIndex){
                $(row).attr('id', 'row-' + dataIndex);
             }
        });
        $('#monthly_tbl').rowReordering();
    }
});
$.get('http://json.invite-comm.jp/api/json/notes', function(files){
    if(files){
        var trs = "";
        for(var i=0; i < files.length; i++){
            trs += '<tr><td>' + files[i].item + ') ' + files[i].text + '</td></tr>';
        }
        $('#note_tbl').find("tbody").append(trs)
        $('#note_tbl').dataTable({
            "searching": false,
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": true,
            "bInfo": false,
            "bAutoWidth": false,
            "bSort" : false
        });
    }
});
$.get('http://json.invite-comm.jp/api/json/company', function(header){
    if(header){
        var details = '<h4>' + header.company + '</h4>'
        details += '<div class="form-inline"><div class="form-group inline-margin"><p><b>Service type:</b> ' + header.type + '</p></div><div class="form-group inline-margin"><p><b>Delivery date:</b> ' + header.delivery +
         '</p></div><div class="form-group inline-margin"><p><b>Payment terms:</b> ' + header.terms + '</p></div></div>'; 
        $('#company').append(details);
        //$('.page-header').append(details);;
    }
});
$.get('http://json.invite-comm.jp/api/json/install', function(files){
    if(files){
        var tr ="";
        var sumOfAmounts = 0;
        var tax = 0;
        var installCosts = 0;
        for(var i=0; i < files.length; i++){
            tr += '<tr><td>' + files[i].item + '</td>' + '<td onclick="editable(this)">' + files[i].desc + '</td>' + '<td class="numbers" onclick="editable(this)">' + files[i].qty + '</td>' + '<td onclick="editable(this)">' + files[i].unit + '</td>' + '<td class="numbers price" onclick="editable(this)"><i class="fa fa-yen"></i> ' + files[i].price + '</td>' + 
            '<td class="install-amount"><i class="fa fa-yen"></i> ' + files[i].amount + '</td>' + '<td onclick="editable(this)">' + files[i].comment + '</td><td><div class="form-inline"><div class="form-group"><button onclick="delete_row(this)" class="btn btn-alert"><i class="fa fa-trash" aria-hidden="true"></i></button></div></div></td></tr>';
            sumOfAmounts += files[i].amount;
        }
        tax = sumOfAmounts * 0.08;
        installCosts = (sumOfAmounts + tax);
        var sum_tr = '<tbody><tr id="row-'+ files.length +'"><td>#</td><td>Consumption Tax</td><td>1</td><td>8%</td><td class="install-tax"><i class="fa fa-yen"></i> ' + sumOfAmounts + '</td><td class="install-tax"><i class="fa fa-yen"></i> ' + tax + '</td><td colspan="2"></td></tr>';
        sum_tr += '<tr id="row-'+ (files.length + 1) +'"><td colspan="3" class="text-center">Initial Costs:</td><td class="text-center install-costs" colspan="5"><i class="fa fa-yen"></i></td></tr></tbody>';
        $('#installation_tbl').find("tbody").append(tr);
        $('#installation_tbl').append(sum_tr)
        $('.install-costs').html('<i class="fa fa-yen"></i> ' +  installCosts.toString());
        $('#installation_tbl').dataTable({
            "searching": false,
            "bPaginate": false,
            "bLengthChange": true,
            "bFilter": false,
            "bInfo": false,
            "bAutoWidth": false,
            "createdRow": function(row, data, dataIndex){
                $(row).attr('id', 'row-' + dataIndex);
             }
        });
        $('#installation_tbl').rowReordering();
    }
});
function editable(element){
  var myText = $(element).text();
  $(element).html('<input class="form-control" type="text" id="myInput">');
  $('#myInput').val(myText);
  $('#myInput').focus();
}
function update(){

    $('#monthly_main>tr').each( function(){
        //e.preventDefault();
        var qtyOrPrice = 1;
        $(this).find('.numbers').each(function(){
            qtyOrPrice = qtyOrPrice * parseInt( $(this).text());
        })
        //alert(qtyOrPrice)
        $(this).find('.month-amount').empty();
        $(this).find('.month-amount').html('<i class="fa fa-yen"></i>' +  qtyOrPrice.toString());
    });
    calculate('.month-amount','.monthly-cost', '.month-tax' );
    $('#install_main>tr').each( function(){
        //e.preventDefault();
        var qtyOrPrice = 1;
        $(this).find('.numbers').each(function(){
            qtyOrPrice = qtyOrPrice * parseInt( $(this).text());
        })
        //alert(qtyOrPrice)
        $(this).find('.install-amount').empty();
        $(this).find('.install-amount').html('<i class="fa fa-yen"></i>' +  qtyOrPrice.toString());
    })
    calculate('.install-amount','.install-costs', '.install-tax');
}
$(document).ready(function(){
    /* function amount_update(the_row){
        alert("@@@@" + the_row.text())
        the_row.find('.numbers').each(function(index){
            alert($(this).html());
        })
    } */
  $(document).delegate('#myInput','focusout',function(){
      var myVal = $(this).val();
      var text = '';
        if($(this).parent().hasClass('price')){
         text += '<i class="fa fa-yen"></i>';
        }
        text += myVal;
      $(this).parent().html(text);
      update();
      $(this).remove();
    });
  
  $(document).delegate('#myInput','keypress',function(event){
    if (event.which==13) {
          var myVal = $(this).val();
      $(this).parent().text(myVal);
      $(this).remove();
    }
    });
  
});

$('.note-add').click(function(e){
    e.preventDefault();
    var new_note = '<tr><td><div class="row"><div class="col-sm-10"><div class="form-group inline-margin"><input class="form-control note" type="text" /></div></div>'+
    '<div class="col-sm-2"><div class="form-inline"><div class="form-group"><button onclick="delete_row(this)" class="btn btn-alert"><i class="fa fa-trash" aria-hidden="true"></i></button></div><div class="form-group"><button onclick="add_note(this)" class="btn btn-success"><i class="fa fa-check" aria-hidden="true"></i></button></div></div></td></tr>';
    $('#note_tbl').find("tbody").prepend(new_note);
})
function delete_row(element){
    $(element).closest('tr').remove();
    reorder();
    update();
}
function add_note(element){
    var text = $(element).closest('tr').find('.note').val();
    var the_tr = $(element).closest('tr');
    the_tr.empty();
    the_tr.html('<td>' + text + '</td>');
}
function add_monthly(element){
    var trs =$('#monthly_main').find('tr').length;
    var new_note = '<tr style="display: table-row;" class="ui-sortable-handle" id="row-'+ trs +'" role="row"><td class="item-number">'+(trs +1 )+'</td><td><input id="monthly_item" class="form-control" type="text" /></td><td><input id="monthly_qty" class="form-control" type="text" /></td>'+
    '<td><input id="monthly_unit" class="form-control" type="text" /></td><td><input id="monthly_price" class="form-control" type="text" /></td>'+
    '<td><input id="monthly_amount" class="form-control" type="text" disabled="disabled" /></td><td><input id="monthly_note" class="form-control" type="text" /></td>' + 
    '<td><div class="form-inline"><div class="form-group"><button onclick="delete_row(this)" class="btn btn-alert"><i class="fa fa-trash" aria-hidden="true"></i></button></div><div class="form-group"><button onclick="save_monthly_row(this)" class="btn btn-success"><i class="fa fa-check" aria-hidden="true"></i></button></div></div></td></tr>';
    $('#monthly_main').append(new_note);
}
function save_monthly_row(element){
    var isnumber = /^\d+$/;
    var the_tr = $(element).closest('tr');
    var number_row = the_tr.find('.item-number').html();
    var description = the_tr.find('#monthly_item').val();
    var qty = isnumber.test(the_tr.find('#monthly_qty').val())?the_tr.find('#monthly_qty').val():0;
    var unit = the_tr.find('#monthly_unit').val();
    var price = isnumber.test(the_tr.find('#monthly_price').val())?the_tr.find('#monthly_price').val():0;
    var note = the_tr.find('#monthly_note').val();
    the_tr.empty();
    var new_row ='<td class="sorting">' + number_row + '</td>' + '<td onclick="editable(this)">' +description + '</td>' + '<td class="numbers" onclick="editable(this)">' + qty + '</td>' + '<td  onclick="editable(this)">' + unit + '</td>' + 
    '<td class="numbers price"  onclick="editable(this)"><i class="fa fa-yen"></i> ' +price + '</td>' + 
    '<td class="month-amount"><i class="fa fa-yen"></i> ' +  (qty*price) + '</td>' + '<td onclick="editable(this)">' + note + '</td><td><div class="form-inline"><div class="form-group"><button onclick="delete_row(this)" class="btn btn-alert"><i class="fa fa-trash" aria-hidden="true"></i></button></div></div></td>';
    the_tr.html(new_row);
    update();
}
function reorder(){
    $('#monthly_tbl').find('.item-number').each(function(index){
        $(this).empty();
        $(this).html((index + 1));
    })
}
function add_install(element){
    var trs =$('#install_main').find('tr').length;
    var new_note = '<tr style="display: table-row;" class="ui-sortable-handle" id="row-'+ trs +'" role="row"><td class="item-number">'+(trs +1 )+'</td><td><input id="monthly_item" class="form-control" type="text" /></td><td><input id="monthly_qty" class="form-control" type="text" /></td>'+
    '<td><input id="monthly_unit" class="form-control" type="text" /></td><td><input id="monthly_price" class="form-control" type="text" /></td>'+
    '<td><input id="monthly_amount" class="form-control" type="text" disabled="disabled" /></td><td><input id="monthly_note" class="form-control" type="text" /></td>' + 
    '<td><div class="form-inline"><div class="form-group"><button onclick="delete_row(this)" class="btn btn-alert"><i class="fa fa-trash" aria-hidden="true"></i></button></div><div class="form-group"><button onclick="save_install_row(this)" class="btn btn-success"><i class="fa fa-check" aria-hidden="true"></i></button></div></div></td></tr>';
    $('#install_main').append(new_note);
}
function save_install_row(element){
    var isnumber = /^\d+$/;
    var the_tr = $(element).closest('tr');
    var number_row = the_tr.find('.item-number').html();
    var description = the_tr.find('#monthly_item').val();
    var qty = isnumber.test(the_tr.find('#monthly_qty').val())?the_tr.find('#monthly_qty').val():0;
    var unit = the_tr.find('#monthly_unit').val();
    var price = isnumber.test(the_tr.find('#monthly_price').val())?the_tr.find('#monthly_price').val():0;
    var note = the_tr.find('#monthly_note').val();
    the_tr.empty();
    var new_row ='<td class="sorting">' + number_row + '</td>' + '<td onclick="editable(this)">' +description + '</td>' + '<td class="numbers" onclick="editable(this)">' + qty + '</td>' + '<td  onclick="editable(this)">' + unit + '</td>' + 
    '<td class="numbers price" onclick="editable(this)"><i class="fa fa-yen"></i> ' +price + '</td>' + 
    '<td class="install-amount"><i class="fa fa-yen"></i> ' +  (qty*price) + '</td>' + '<td onclick="editable(this)">' + note + '</td><td><div class="form-inline"><div class="form-group"><button onclick="delete_row(this)" class="btn btn-alert"><i class="fa fa-trash" aria-hidden="true"></i></button></div></div></td>';
    the_tr.html(new_row);
    update();
}
function calculate(amounts, costTarget,taxTarget){
    var sum = 0;
    var isnumber = /^\d+$/g;
    $(amounts).each(function(){
        /* var amount = isnumber.test($(this).text().toString())?$(this).text():0;
        alert($(this).text());
        alert(amount); */
        sum += parseInt($(this).text());
    });
    $(costTarget).empty();
    $(taxTarget).empty();
    var tax = sum * 0.08;
    $(taxTarget).html('<i class="fa fa-yen"></i> ' +  tax.toString())
    sum = (sum + tax);
    $(costTarget).html('<i class="fa fa-yen"></i> ' +  sum.toString());
}
