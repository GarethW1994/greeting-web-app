var languages = ['English', 'isiXhosa', 'Afrikaans'];

var selectedLang = "";

module.exports = function selectedLanguage(radio) {

    for (var i = 0; i < languages.length; i++) {
        if (radio === languages[i]) {
            selectedLang = languages[i];
        }
    }
    
    if (selectedLang === languages[0]) {
        return "Hello";      
    } else if (selectedLang === languages[1]) {
        return "Molo";
    } else {
        return "Goeie Dag";
    }
};