import works from './data/works.js'
import groups from './data/groups.js'
console.log("Script loaded")

const workSelector = document.querySelector('#workSelector')
const groupSelector = document.querySelector('#groupSelector')
const launchBtn = document.querySelector('#launchBtn')
const resultCard = document.querySelector('#resultCard')
const dataChoosenStorage = document.querySelector('#dataChoosenStorage')

// Build Selectors
provideOptions(workSelector,works)
provideOptions(groupSelector,groups)

// Event TRIGGERS
launchBtn.addEventListener('click',e=>{
    const workId = workSelector.value
    const groupId = groupSelector.value
    console.log(`launch randomizer students in ${groupId} for work with ID ${workId}`)

    const selectedWork = works.find((work) => work.id === workId);
    const selectedGroup = groups.find((group) => group.id === groupId);

    const randomized = {
        label : selectedWork.label,
        dispatch : []
    }
    const alreadyChoosen = []
    selectedWork.questions.map(question=>{
        const student = selectStudents(selectedGroup.students,alreadyChoosen)
        randomized.dispatch.push({question:question,student:student})
        alreadyChoosen.push(student)
    })

    dataChoosenStorage.dataset.choosen = alreadyChoosen.join(",")
    displayResult(resultCard,randomized)

})






///////////////////////////////////////////////////////////////
// FUNCTIONS
///////////////////////////////////////////////////////////////

function provideOptions(selector,data){

    data.map(item=>{
        const opt = document.createElement('option')
        opt.value = item.id
        opt.text = item.label
        selector.add(opt)
    })
}


function random(mn, mx) {
    return Math.random() * (mx - mn) + mn;
}

function selectStudents(base,alreadyChoosen){
    const fileredBase = base.filter(st=>!alreadyChoosen.includes(st))
    return fileredBase[(Math.floor(random(1, fileredBase.length))) - 1]
}

function displayResult(targetEl,data){
    targetEl.classList.remove("d-none")
    targetEl.querySelector('.card-header').textContent = `Attribution des questions pour le sujet ${data.label}`
    const cardBodyEl = targetEl.querySelector('.card-body')
    const tableTemplate = document.querySelector('#resultTable')
    const lineTemplate = document.querySelector('#resultLine')
    const cloneTable = tableTemplate.content.cloneNode(true)
    const tbody = cloneTable.querySelector('tbody')

    //Clean up previous randomized
    Array.from(cardBodyEl.children).forEach(item=>item.remove())

    //Build new randomized display
    data.dispatch.map((item,idx)=>{
        const cloneLine = lineTemplate.content.cloneNode(true)
        //const tds = cloneLine.querySelectorAll('tr > td')
        cloneLine.querySelector('tr').children[0].textContent = item.question
        cloneLine.querySelector('tr').children[1].textContent = item.student
        cloneLine.querySelector('tr').children[2].firstElementChild.setAttribute('id','regenOneBtn'+idx)
        cloneLine.querySelector('tr').children[2].firstElementChild.dataset.student = item.student

        tbody.appendChild(cloneLine)
    })
    cardBodyEl.append(cloneTable)


    document.querySelectorAll("[id^='regenOneBtn']").forEach(btn=>{
        btn.addEventListener('click',e=>{

            const groupId = groupSelector.value
            const selectedGroup = groups.find((group) => group.id === groupId);
            const choosenArr = dataChoosenStorage.dataset.choosen.split(',')
            const currentStudent = e.target.dataset.student
            const currentStudentIdx = choosenArr.indexOf(currentStudent)
            const newStudent = selectStudents(selectedGroup.students,choosenArr)

            choosenArr[currentStudentIdx] = newStudent
            dataChoosenStorage.dataset.choosen = choosenArr.join(',')
            e.target.parentElement.previousElementSibling.textContent = newStudent
            e.target.dataset.student = newStudent
        })
    })
}

