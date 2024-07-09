using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace awqaf.Domain
{
    [Table("offers")]
    public class Offers : BaseEntity<long>
    {
        [Required]
        public string ProviderId { get; set; }
        public string SubProviderId { get; set; }
        public string OfferNameInEnglish { get; set; }
        public string OfferNameInArabic { get; set; }
        [Required]
        public int? OfferAmountPercentage { get; set; }
        public DateTime OfferStartDate { get; set; }
        public DateTime OfferEndDate { get; set; }
        public bool? OfferIsValidate { get; set; }
        public double? OfferPrice { get; set; }
        public string OfferCode { get; set; }
        public string Location { get; set; }
        public string OfferDetailsInEnglish { get; set; }
        public string OfferDetailsInArabic { get; set; }
        public string AddedBy { get; set; }
        public DateTime? CreationDate { get; set; }
        public string WebsiteUrl { get; set; }
        public string LocationInArabic { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public bool? IsWebsiteOrApp { get; set; }
        public string OfferImageUrl { get; set; }

        public long? OffersCategoriesId { get; set; }
        public OffersCategories OffersCategories { get; set; }

      

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var offers = obj as Offers;
            if (offers?.Id == null || offers?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, offers.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Offers{" +
                    $"ID='{Id}'" +
                    $", ProviderId='{ProviderId}'" +
                    $", SubProviderId='{SubProviderId}'" +
                    $", OfferNameInEnglish='{OfferNameInEnglish}'" +
                    $", OfferNameInArabic='{OfferNameInArabic}'" +
                    $", OfferAmountPercentage='{OfferAmountPercentage}'" +
                    $", OfferStartDate='{OfferStartDate}'" +
                    $", OfferEndDate='{OfferEndDate}'" +
                    $", OfferIsValidate='{OfferIsValidate}'" +
                    $", OfferPrice='{OfferPrice}'" +
                    $", OfferCode='{OfferCode}'" +
                    $", Location='{Location}'" +
                    $", OfferDetailsInEnglish='{OfferDetailsInEnglish}'" +
                    $", OfferDetailsInArabic='{OfferDetailsInArabic}'" +
                    $", AddedBy='{AddedBy}'" +
                    $", CreationDate='{CreationDate}'" +
                    $", WebsiteUrl='{WebsiteUrl}'" +
                    $", LocationInArabic='{LocationInArabic}'" +
                    $", Latitude='{Latitude}'" +
                    $", Longitude='{Longitude}'" +
                    $", IsWebsiteOrApp='{IsWebsiteOrApp}'" +
                    $", OfferImageUrl='{OfferImageUrl}'" +
                    "}";
        }
    }
}
