$.get('http://json.invite-comm.jp/api/json/notes', function(files){
    if(files){
        var trs = "";
        for(var i=0; i < files.length; i++){
            trs += '<tr><td>' + files[i].item + ') ' + files[i].text + '</td></tr>';
        }
        $('#note_tbl').find("tbody").append(trs)
        var table = $('#note_tbl').dataTable({
            "searching": false,
            "bPaginate": false,
            "bLengthChange": false,
            "bFilter": true,
            "bInfo": false,
            "bAutoWidth": false,
            "bSort" : false
        });
        table.rowReordering();
    }
});