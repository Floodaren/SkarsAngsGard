import { LoggedInOrNotService } from '../logged-in-or-not.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-sale-section',
  templateUrl: './sale-section.component.html',
  styleUrls: ['./sale-section.component.css']
})
export class SaleSectionComponent implements OnInit {
  salesItems;
  loggedInOrNot;
  closeResult: string;
  fileToUpload: File = null;
  constructor(private loggedInService:LoggedInOrNotService, private modalService: NgbModal) { }

  ngOnInit() {
    this.checkLogin();
    this.getSalesItems();
  }

  async getSalesItems()
  {
    axios.get('http://localhost:3030/GetSalesItems', {
    })
    .then(result => {
      console.log(result);
      this.salesItems = result.data.items;
    })
    .catch(function (error) {
      console.log(error);
      alert("Kunde inte kontakta servern");
    });
  }

  async checkLogin()
  {
    if (this.loggedInService.checkLoginStatus() == true)
    {
      this.loggedInOrNot = true;
    }
    else 
    {
      this.loggedInOrNot = false;
    }
  }

  //#region Modal 
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
  }

  open2(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  //#endregion Modal
  //#region Add
  newAddModal(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  newAddSave(newAddHeading,newAddText): any{
    var fileToUpload: File = this.fileToUpload;
    console.log(fileToUpload);
    const formData: FormData = new FormData();
    formData.append("image", fileToUpload, fileToUpload.name);
    var filename = fileToUpload.name;
    axios.post('http://localhost:3030/NewAdd', {
      file: formData,
      filename: filename,
      heading: newAddHeading,
      text: newAddText
    })
    .then(result => {
      console.log(result);
    })
    .catch(function (error) {
      console.log(error);
      alert("Kunde inte kontakta servern");
    });
    
  }

  handleFileInput(files: FileList)
  {
    this.fileToUpload = files.item(0);
  }

  async saveAddChanges( changeId, inputheading, inputText)
  {    
    await axios.post('http://localhost:3030/ChangeAdd', {
      changeId: changeId,
      changeHeading: inputheading,
      changeText: inputText
    })
    .then(result => {
      console.log(result);
    })
    .catch(function (error) {
      console.log(error);
      alert("Kunde inte kontakta servern");
    });
    await this.getSalesItems();
  }

  async removeAdd(deleteId)
  {
    var removeConfirm = confirm("Är du säker på att du vill ta bort?");
    if (removeConfirm == true)
    {
      await axios.post('http://localhost:3030/RemoveAdd', {
        deleteId: deleteId,
      })
      .then(result => {
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
        alert("Kunde inte kontakta servern");
      });
      await this.getSalesItems();
    }    
  }
  //#endregion Add
}
