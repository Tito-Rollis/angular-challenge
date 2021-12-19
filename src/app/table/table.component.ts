import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  DoCheck,
  AfterViewInit,
} from '@angular/core';
import { MentorService } from '../../services/mentorServices/mentor.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface Data {
  name: string;
  position: number;
  type: string;
  entity: string;
}

interface User {
  value: string;
  viewValue: string;
}

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [MentorService],
})
export class TableComponent implements OnInit {
  @ViewChild('searchName') searchName: ElementRef;
  @ViewChild('searchType') searchType: ElementRef;
  name: string = ' ';
  type: string = ' ';
  selectedValue: string;
  selectedStatus: string;
  users: User[] = [
    { value: 'All', viewValue: 'All' },
    { value: 'Company', viewValue: 'Company' },
  ];
  status: Status[] = [
    { value: 'All', viewValue: 'All' },
    { value: 'Active', viewValue: 'Active' },
    { value: 'Pending', viewValue: 'Pending' },
    { value: 'Incorrect Email', viewValue: 'Incorrect Email' },
  ];

  displayedColumns: string[] = [
    'name',
    'user type',
    'entity',
    'status',
    'action',
  ];
  items: any;
  backUp: any;

  constructor(private mentorService: MentorService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.mentorService.getMentor().subscribe((data) => {
      console.log(data);
      this.items = data;
      this.backUp = data;
    });
  }

  searchNameHandler() {
    this.name = this.searchName.nativeElement.value;
    this.items = this.items.filter(
      (item) =>
        item.last_name.toLowerCase().includes(this.name.toLowerCase()) ||
        item.first_name.toLowerCase().includes(this.name.toLowerCase())
    );
  }

  searchTypeHandler() {
    this.type = this.searchType.nativeElement.value;
    console.log(this.type);
    this.items = this.items.filter((item) =>
      item.company.user_type.toLowerCase().includes(this.type.toLowerCase())
    );
  }

  searchEntityHandler() {
    this.items = this.items.filter((item) =>
      item.company.name.toLowerCase().includes(this.selectedValue.toLowerCase())
    );
  }

  searchStatusHandler() {
    this.items = this.items.filter((item) =>
      item.user_status.toLowerCase().includes(this.selectedStatus.toLowerCase())
    );
  }

  reset() {
    console.log(this.selectedValue);
    return (this.items = this.backUp);
  }

  delete(n) {
    this.items.splice(
      this.items.findIndex((el) => el._id == n.target.id),
      1
    );
  }

  openDialog(): void {}
}
