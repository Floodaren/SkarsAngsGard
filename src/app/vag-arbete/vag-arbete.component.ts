import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-vag-arbete',
  templateUrl: './vag-arbete.component.html',
  styleUrls: ['./vag-arbete.component.css']
})

export class VagArbeteComponent implements OnInit {
  numberOfWeeks = 
    {weeks:[{weeknr: 1},{weeknr: 2},{weeknr: 3},{weeknr: 4},{weeknr: 5},{weeknr: 6},{weeknr: 7},{weeknr: 8},{weeknr: 9},{weeknr: 10}]}
  
  personMarkedWeeks = 
  [ 
    {personId: 1, name: "Sussie Flod", markedWeeks:[{weeknr: 1, checkedOrNot: 0},{weeknr: 2, checkedOrNot: 0},{weeknr: 3, checkedOrNot: 0},{weeknr: 4, checkedOrNot: 0},{weeknr: 5, checkedOrNot: 0},{weeknr: 6, checkedOrNot: 0},{weeknr: 7, checkedOrNot: 0},{weeknr: 8, checkedOrNot: 0},{weeknr: 9, checkedOrNot: 0},{weeknr: 10, checkedOrNot: 0}]},
    {personId: 2, name: "Olle Flod", markedWeeks:[{weeknr: 1, checkedOrNot: 0},{weeknr: 2, checkedOrNot: 0},{weeknr: 3, checkedOrNot: 0},{weeknr: 4, checkedOrNot: 0},{weeknr: 5, checkedOrNot: 0},{weeknr: 6, checkedOrNot: 0},{weeknr: 7, checkedOrNot: 0},{weeknr: 8, checkedOrNot: 0},{weeknr: 9, checkedOrNot: 0},{weeknr: 10, checkedOrNot: 0}]},
    {personId: 3, name: "Person 3", markedWeeks:[{weeknr: 1, checkedOrNot: 0},{weeknr: 2, checkedOrNot: 0},{weeknr: 3, checkedOrNot: 0},{weeknr: 4, checkedOrNot: 0},{weeknr: 5, checkedOrNot: 0},{weeknr: 6, checkedOrNot: 0},{weeknr: 7, checkedOrNot: 0},{weeknr: 8, checkedOrNot: 0},{weeknr: 9, checkedOrNot: 0},{weeknr: 10, checkedOrNot: 0}]},
    {personId: 4, name: "Person 4", markedWeeks:[{weeknr: 1, checkedOrNot: 0},{weeknr: 2, checkedOrNot: 0},{weeknr: 3, checkedOrNot: 0},{weeknr: 4, checkedOrNot: 0},{weeknr: 5, checkedOrNot: 0},{weeknr: 6, checkedOrNot: 0},{weeknr: 7, checkedOrNot: 0},{weeknr: 8, checkedOrNot: 0},{weeknr: 9, checkedOrNot: 0},{weeknr: 10, checkedOrNot: 0}]},
    {personId: 5, name: "Person 5", markedWeeks:[{weeknr: 1, checkedOrNot: 0},{weeknr: 2, checkedOrNot: 0},{weeknr: 3, checkedOrNot: 0},{weeknr: 4, checkedOrNot: 0},{weeknr: 5, checkedOrNot: 0},{weeknr: 6, checkedOrNot: 0},{weeknr: 7, checkedOrNot: 0},{weeknr: 8, checkedOrNot: 0},{weeknr: 9, checkedOrNot: 0},{weeknr: 10, checkedOrNot: 0}]},
    {personId: 6, name: "Person 6", markedWeeks:[{weeknr: 1, checkedOrNot: 0},{weeknr: 2, checkedOrNot: 0},{weeknr: 3, checkedOrNot: 0},{weeknr: 4, checkedOrNot: 0},{weeknr: 5, checkedOrNot: 0},{weeknr: 6, checkedOrNot: 0},{weeknr: 7, checkedOrNot: 0},{weeknr: 8, checkedOrNot: 0},{weeknr: 9, checkedOrNot: 0},{weeknr: 10, checkedOrNot: 0}]}
  ]
    
  

    
  groupMemberNames:any;
  groupNumberList:any;
  getYear = new Date();
  year = this.getYear.getFullYear();
  constructor() {
    this.groupNumbers();
    this.getGroupMembers();
    this.getMarkedWeeks();
   }

  pressedWeek(person,item)
  {
    //console.log(item);
    //console.log(person);

    if (item.checkedOrNot == 0)
    {
      item.checkedOrNot = 1;
    }
    else if (item.checkedOrNot == 1) 
    {
      item.checkedOrNot = 0;
    }
    else 
    {

    }
    axios.post('http://localhost:3030/RoadBookForPerson', {
      userId: person,
      markedWeek: item.weeknr,
      markedOrNot: item.checkedOrNot
    })
    .then(result => {
      console.log(result);
    })
    .catch(function (error) {
      console.log(error);
      alert("Kunde inte kontakta servern");
    });
  }

  groupNumbers()
  {
    axios.get('http://localhost:3030/GetGroupNumbers', {
    })
    .then(result => {
      this.groupNumberList = result.data.groupNumbers;
    })
    .catch(function (error) {
      console.log(error);
      alert("Kunde inte kontakta servern");
    });
  }

  getGroupMembers() {
    axios.get('http://localhost:3030/GetRoadGroupsMembers', {
    })
    .then(result => {
      this.groupMemberNames = result.data.members;
    })
    .catch(function (error) {
      console.log(error);
      alert("Kunde inte kontakta servern");
    });
  }

  getMarkedWeeks() {
    axios.get('http://localhost:3030/GetMarkedWeeksForSpecificUsers', {
    })
    .then(result => {
      console.log(result);
      for (var x = 0;x<this.personMarkedWeeks.length;x++)
      {
        for (var y = 0; y<result.data.markedWeeks.length;y++)
        {
          if (result.data.markedWeeks[y].PersonId == this.personMarkedWeeks[x].personId)
          {
            for (var l = 0; l<this.personMarkedWeeks[x].markedWeeks.length;l++)
            {
              if (result.data.markedWeeks[y].MarkedWeeksId == this.personMarkedWeeks[x].markedWeeks[l].weeknr)
              {
                this.personMarkedWeeks[x].markedWeeks[l].checkedOrNot = 1;
              }
            }
          }
        }
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Kunde inte kontakta servern");
    });
  }

  ngOnInit() {  
  }
}
