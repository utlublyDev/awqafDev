using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace awqaf.Domain
{
    [Table("offers_categories")]
    public class OffersCategories : BaseEntity<long>
    {
        [Required]
        public string OfferCategorieNameInEnglish { get; set; }
        [Required]
        public string OfferCategorieNameInArabic { get; set; }
        public string OfferCategorieIconUrl { get; set; }
        public string AddedBy { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreationDate { get; set; }
        public long? OfferProviderId { get; set; }

       

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var offersCategories = obj as OffersCategories;
            if (offersCategories?.Id == null || offersCategories?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, offersCategories.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "OffersCategories{" +
                    $"ID='{Id}'" +
                    $", OfferCategorieNameInEnglish='{OfferCategorieNameInEnglish}'" +
                    $", OfferCategorieNameInArabic='{OfferCategorieNameInArabic}'" +
                    $", OfferCategorieIconUrl='{OfferCategorieIconUrl}'" +
                    $", AddedBy='{AddedBy}'" +
                    $", Status='{Status}'" +
                    $", CreationDate='{CreationDate}'" +
                    $", OfferProviderId='{OfferProviderId}'" +
                    "}";
        }
    }
}
