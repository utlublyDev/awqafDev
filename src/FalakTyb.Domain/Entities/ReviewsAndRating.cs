using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace awqaf.Domain
{
    [Table("reviews_and_rating")]
    public class ReviewsAndRating : BaseEntity<long>
    {
        public string UserIdAwqaf { get; set; }
        public string ProviderId { get; set; }
        public string OfferId { get; set; }
        public string Review { get; set; }
        public int? Rating { get; set; }

    

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var reviewsAndRating = obj as ReviewsAndRating;
            if (reviewsAndRating?.Id == null || reviewsAndRating?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, reviewsAndRating.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "ReviewsAndRating{" +
                    $"ID='{Id}'" +
                    $", UserIdAwqaf='{UserIdAwqaf}'" +
                    $", ProviderId='{ProviderId}'" +
                    $", OfferId='{OfferId}'" +
                    $", Review='{Review}'" +
                    $", Rating='{Rating}'" +
                    "}";
        }
    }
}
