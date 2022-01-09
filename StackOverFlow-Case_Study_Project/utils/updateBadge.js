const badges = ['NewBie', 'Apprentice', 'Advanced', 'Experienced', 'Superior', 'Ultra', 'Professional', 'Expert', 'Champion', 'Master', 'Celebrity', 'Legendary']

async function udpateBadge ( user, options ) {
    if(options.fields.includes('reputation_point')) {
        if( user.reputation_point > 30 && user.reputation_point < 500 ) {
            return user.update({ badge: badges[1]});
        } else if( user.reputation_point >= 500 && user.reputation_point < 1000 ) {
            return user.update({ badge: badges[2]});
        } else if ( user.reputation_point >= 1000 && user.reputation_point < 1500 ) {
            return user.update({ badge: badges[3]});
        } else if( user.reputation_point >= 1500 && user.reputation_point < 2000 ) {
            return user.update({ badge: badges[4]});
        } else if ( user.reputation_point >= 2000 && user.reputation_point < 2500 ) {
            return user.update({ badge: badges[5]});
        } else if ( user.reputation_point >= 2500 && user.reputation_point < 3000 ) {
            return user.update({ badge: badges[6]});
        } else if( user.reputation_point >= 3000 && user.reputation_point <  3500 ) {
            return user.update({ badge: badges[7]});
        } else if ( user.reputation_point >= 3500 && user.reputation_point < 4000 ) {
            return user.update({ badge: badges[8]});
        } else if ( user.reputation_point >= 4000 && user.reputation_point < 4500 ) {
            return user.update({ badge: badges[9]});
        } else if ( user.reputation_point >= 4500  && user.reputation_point < 5000 ) {
            return user.update({ badge: badges[10]});
        } else {
            return user.update({ badge: badges[11]});
        }
    }
}

module.exports = { udpateBadge };