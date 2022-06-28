window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)'
};

var randomScalingFactor = function () {
    return (Math.random() > 0.5 ? 1.0 : 1.0) * Math.round(Math.random() * 100);
};

var data = [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(),];

var labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var numberOfEvents = 5;

var edonebutton = document.getElementById("eventdonebutton");
edonebutton.onclick = function generatedroplist() {
    $('#generatedroplist').empty();

    var list = document.getElementById("generatedroplist"); //when click done button then populate
    for (var h = 1; h < numberOfEvents + 1; h++) {
        var opt = "Event " + h;
        var li = document.createElement("li");
        var link = document.createElement("a");
        var text = document.createTextNode(opt);
        link.appendChild(text);
        link.href = "#";
        li.appendChild(link);
        list.appendChild(li);
    }

    bindClickEvent();
};

var bindClickEvent = function () {
    $('#generatedroplist li').click(function (e) {
        console.log('clicked');
        var ctx = document.getElementById("barChart");
        var barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Workload Value',
                    data: data,
                    backgroundColor: 'rgba(244, 81, 30, 0.5)',
                    borderColor: 'rgba(244, 81, 30, 0.5)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    });
}