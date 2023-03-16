import { Component, Input } from '@angular/core';
import { FormsModule } from "@angular/forms";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'good-match-challenge';

    name1 = '';
    name2 = '';
    result = ``;

    private matchesWord: string = `matches`;
    private highPercentage: number = 80;
    private finalDigitCount: number = 2;
    private sentenceArray: Array<string> = new Array<string>();
    private lettersMap: Map<string, number> = new Map<string, number>();

    onKeyName1(event: any) {
        this.name1 = event.target.value;
    }

    onKeyName2(event: any) {
        this.name2 = event.target.value;
    }

    public matchWords() {
        const isName1Valid = this.validateInput(this.name1);
        const isName2Valid = this.validateInput(this.name2);
        if (isName1Valid && isName2Valid) {
            this.result = this.getMatch(this.name1, this.name2);
            return;
        }
        this.result = `Invalid input! Only Characters allowed.`;
    }

    private validateInput(value: string): boolean {
        if (value.match(/^[0-9!@#\$%\^\&*\)\(+=._-]+$/g)) {
            return false;
        }
        if(value == ``) return false;
        return true;
    }

    public getMatch(name1: string, name2: string): string {

        const sentence = `${name1}${this.matchesWord}${name2}`;
        this.sentenceArray = Array.from(sentence);

        this.createLettersMap();

        let numbersSentence = this.getInitialNumbersSentenceFromMap();

        while (numbersSentence.length > this.finalDigitCount) {
            numbersSentence = this.getNumbersSentence(numbersSentence);
        }

        const finalMatchPercentage: number = parseInt(numbersSentence);

        return this.getMatchSentenceWithPercentage(name1, name2, finalMatchPercentage);
    }

    private createLettersMap(): void {
        const map: Map<string, number> = new Map<string, number>();

        for (let letter of this.sentenceArray) {
            letter = letter.toLowerCase();

            if (!map.has(letter)) {
                map.set(letter, 1);
            }
            else {
                const letterCount = map.get(letter);
                map.set(letter, letterCount! + 1);
            }
        }

        this.lettersMap = map;
    }

    private getInitialNumbersSentenceFromMap(): string {
        let numbersSentence = ``;

        for (const [key, value] of this.lettersMap) {
            numbersSentence += value;
        }

        return numbersSentence;

    }

    private getNumbersSentence(numbers: string): string {
        let numbersAdded = 0;
        let newNumbersSentence = ``;
        let numbersArray = Array.from(numbers);
        let endIndex = numbersArray.length - 1;

        for (let startIndex = 0; startIndex < numbersArray.length / 2; startIndex++) {
            if (startIndex === endIndex) {
                newNumbersSentence += numbersArray[startIndex];
                break;
            }
            numbersAdded = parseInt(numbersArray[startIndex]) + parseInt(numbersArray[endIndex]);
            newNumbersSentence += numbersAdded;
            endIndex--;
        }

        return newNumbersSentence;
    }

    private getMatchSentenceWithPercentage(name1: string, name2: string, percentage: number): string {

        let matchSentenceWithPercentage = ``;

        if (percentage >= this.highPercentage) {
            matchSentenceWithPercentage = `${name1} ${this.matchesWord} ${name2} ${percentage}%, good match`
        }
        else {
            matchSentenceWithPercentage = `${name1} ${this.matchesWord} ${name2} ${percentage}%`
        }

        return matchSentenceWithPercentage;
    }

}


