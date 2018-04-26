
// ------------------------------------------------------------
//収取したデータを扱うためのクラス
//このクラスは野球、バスケットボール、サッカーみたいに2つのチームが
//1つのスコアを持つ競技に使えるが、ゴルフ、相撲みたいな競技のために
//新しいクラスを定義する必要がある。
// ------------------------------------------------------------

class ScoreDataObject {

    constructor(teamName_A, score_A, teamName_B, score_B, recoredTime, site, compareFlag) {
        this.teamName_A = teamName_A;
        this.score_A = score_A;
        this.teamName_B = teamName_B;
        this.score_B = score_B;
        this.recoredTime = recoredTime;
        this.site = site;
        this.compareFlag = compareFlag;
    }

}
module.exports = ScoreDataObject;