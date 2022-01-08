const badges = ['NewBie', 'Apprentice', 'Advanced', 'Experienced', 'Superior', 'Ultra', 'Professional', 'Expert', 'Champion', 'Master', 'Celebrity', 'Legendary']

async function udpateBadge ( user, options ) {
    console.log(user.badge)
    if(options.fields.includes('reputation_point')) {
        if( user.reputation_point > 30 && user.reputation_point < 100 ) {
            user.badge = badges[1];
        } else if( user.reputation_point >= 100 && user.reputation_point < 500 ) {
            user.badge = badges[2];
        } else if ( user.reputation_point >= 500 && user.reputation_point < 1000 ) {
            user.badge = badges[3];
        } else if( user.reputation_point >= 1000 && user.reputation_point < 1500 ) {
            user.badge = badges[4];
        } else if ( user.reputation_point >= 1500 && user.reputation_point < 2000 ) {
            user.badge = badges[5];
        } else if ( user.reputation_point >= 2000 && user.reputation_point < 2500 ) {
            user.badge = badges[6];
        } else if( user.reputation_point >= 2500 && user.reputation_point <  3000 ) {
            user.badge = badges[7];
        } else if ( user.reputation_point >= 3000 && user.reputation_point < 3500 ) {
            user.badge = badges[8];
        } else if ( user.reputation_point >= 3500 && user.reputation_point < 4000 ) {
            user.badge = badges[9];
        } else if ( user.reputation_point >= 4000  && user.reputation_point < 5000 ) {
            user.badge = badges[10];
        } else {
            user.badge = badges[11];
        }
    }
}

module.exports = { udpateBadge };