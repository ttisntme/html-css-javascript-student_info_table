
/////////////// add a new row at the bottom of the table /////////////

function addRow(){
    var tableRef = document.getElementById("myTable");
    var newRow = tableRef.insertRow(tableRef.rows.length); // origin row num = 7, row num + 1, create a new row
    var colCount = tableRef.rows[0].cells.length; // column num = 9, a row has 9 cells

    // var sn = tableRef.rows.length-4; 
    var sn = tableRef.rows.length/2;
    // alert(sn);
    newRow.className = "student";   // new TableRow can not be found by name, so use className
    
    for (var i=0 ; i < colCount ; i++){
        var newCell = newRow.insertCell(i);  // create a new cell in this row
        if(i==0){   // first column
            var newCheckbox = document.createElement("input");
            newCheckbox.type = "checkbox";    // create checkbox
            newCheckbox.name = "checkBox";
            newCheckbox.onclick = function(){  // in one function calls other function
                checkStatus(sn);
            };
            var newImg = document.createElement("img")
            newImg.src = "down.png";   // create image
            newImg.width = "25";
            newImg.onclick = function(){  // in one function calls other function
                showDropDownTextArea(sn);
            };

            newCell.appendChild(newCheckbox);    // connect new node to the cellList
            newCell.appendChild(document.createElement("br"));  // create break row
            newCell.appendChild(document.createElement("br"));
            newCell.appendChild(newImg);
        }
        else if(i!=colCount-1){ // except the first and the last column
            switch(i){
                case 1: var newText = document.createTextNode("Student "+ sn);
                        newCell.appendChild(newText); break;
                case 2: var newText = document.createTextNode("Teacher "+ sn);
                        newCell.appendChild(newText); break;
                case 3: var newText = document.createTextNode("Approved");
                        newCell.appendChild(newText); break;
                case 4: var newText = document.createTextNode("Fall");
                        newCell.appendChild(newText); break;
                case 5: var newText = document.createTextNode("TA");
                        newCell.appendChild(newText); break;
                case 6: var newText = document.createTextNode(Math.round(Math.random()*100000));
                        newCell.appendChild(newText); break;
                case 7: var newText = document.createTextNode("100%");
                        newCell.appendChild(newText); break;
            }
        }else{// create new delete button in the last column
            var newDeleteButton = document.createElement("input");
            newDeleteButton.type = "button";    
            newDeleteButton.name = "deleteButton";
            newDeleteButton.onclick = function(){  // in one function calls other function
                deleteRow(sn);
            };
            newDeleteButton.style.display = "none";
            newDeleteButton.value = "Delete";
            newCell.appendChild(newDeleteButton);
        }
    }
    ///////////// add corresponding drop down text area //////////////
    var newRowDropDownText = tableRef.insertRow(tableRef.rows.length);
    newRowDropDownText.className = "dropDownTextArea";
    var newRowDDTCell = newRowDropDownText.insertCell(0); 
    newRowDDTCell.colSpan = 8;    // the first cell in this row takes 8 columns
    newRowDDTCell.appendChild(document.createTextNode("Advisor:"));
    newRowDDTCell.appendChild(document.createElement("br"));newRowDDTCell.appendChild(document.createElement("br"));
    newRowDDTCell.appendChild(document.createTextNode("Award Details"));
    newRowDDTCell.appendChild(document.createElement("br"));
    newRowDDTCell.appendChild(document.createTextNode("Summer 1-2014(TA)"));
    newRowDDTCell.appendChild(document.createElement("br"));
    newRowDDTCell.appendChild(document.createTextNode("Budget Number:"));
    newRowDDTCell.appendChild(document.createElement("br"));
    newRowDDTCell.appendChild(document.createTextNode("Tuition Number:"));
    newRowDDTCell.appendChild(document.createElement("br"));
    newRowDDTCell.appendChild(document.createTextNode("Comments:"));
    newRowDDTCell.appendChild(document.createElement("br"));newRowDDTCell.appendChild(document.createElement("br"));newRowDDTCell.appendChild(document.createElement("br"));
    newRowDDTCell.appendChild(document.createTextNode("Award Status:"));
    newRowDDTCell.appendChild(document.createElement("br"));newRowDDTCell.appendChild(document.createElement("br"));newRowDDTCell.appendChild(document.createElement("br"));

}

//////////// checkbox status change, bright background-color and submit & delete button change //////////////////

function checkStatus(num){
    // alert("in the checkStatus function!");
    var targetCheckBox = "checkBox";
    var targetStudent = "student";
    var targetButton = "deleteButton";
    var buttonList = document.getElementsByName(targetButton);
    var checkboxList = document.getElementsByName(targetCheckBox); // ByName, multiple elements
    var chenkboxFlag = checkboxList[num-1].checked; // check is true, uncheck is false
    // alert(chenkboxFlag);
    // alert("num= "+num);
    if(chenkboxFlag){
        document.getElementsByClassName(targetStudent)[num-1].style.backgroundColor = "orange"; // .style   change background-color
        buttonList[num-1].style.display = "block";  // checked, display delete button
    }else{
        document.getElementsByClassName(targetStudent)[num-1].style.backgroundColor = "white";
        buttonList[num-1].style.display = "none";   // unchecked, hide delete button
    }

    submitButtonRefresh(); // refresh submit button status
}

////////// submit button change with the checkbox status ///////////////

function submitButtonRefresh(){
    // alert("in the submitButtonRefresh function!");
    var targetCheckBox = "checkBox";
    var checkboxList = document.getElementsByName(targetCheckBox);
    var checkboxNum = checkboxList.length; // overall checkbox 
    var submitFlag = 0;
    for(var i=0;i<checkboxNum;i++){
        if(checkboxList[i].checked){  
                submitFlag = 1; // at least one checkbox is checked
                i=checkboxNum; // jump out
        }
    }
    var submitButton = document.getElementById("button");
    if(submitFlag){
        submitButton.style.backgroundColor = "orange";
        submitButton.style.border = "orange";
        submitButton.disabled = false;   // able submit button
    }else{
        submitButton.style.backgroundColor = "gray";
        submitButton.style.border = "gray";
        submitButton.disabled = true;   // disable submit button
    }
}

///////// delete button to delete the checked row, and refresh the submit button /////////////////

function deleteRow(num){
    // alert("in the deleteRow function!");
    var targetStudent = "student"; 
    var studentRowList = document.getElementsByClassName(targetStudent);  // student row list
    studentRowList[num-1].style.display = "none";  // choose specific row in the list
    var targetCheckBox = "checkBox";
    document.getElementsByName(targetCheckBox)[num-1].checked = false; // deleted row set unchecked
    submitButtonRefresh(); // refresh submit button
    document.getElementsByClassName("dropDownTextArea")[num-1].style.display = "none"; // hide the corresponding drop down text
}

//////// show drop down text area //////////////////////

function showDropDownTextArea(num){
    var dropDownTextList = document.getElementsByClassName("dropDownTextArea");
    var targetDropDownText = dropDownTextList[num-1];
    if(targetDropDownText.style.display == "table-row"){
        targetDropDownText.style.display = "none";
    }else{
        targetDropDownText.style.display = "table-row";  // display as table-row. if as block, it will only in the first column
    }
    // alert("now dropdowntext display: "+targetDropDownText.style.display)
}