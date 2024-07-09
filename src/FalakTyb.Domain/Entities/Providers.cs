using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace awqaf.Domain
{
    [Table("providers")]
    public class Providers : BaseEntity<long>
    {
        [Required]
        public string ProviderNameInEnglish { get; set; }
        [Required]
        public string ProviderNameInArabic { get; set; }
        [Required]
        public string Latitude { get; set; }
        [Required]
        public string Longitude { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string ProviderImageUrl { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public bool? IsActive { get; set; }
        public bool? IsWeChooseForYou { get; set; }
        public bool? IsVip { get; set; }
        public string Note { get; set; }
        public bool? ItWillHaveSubProviders { get; set; }
        public string AddedBy { get; set; }
        public DateTime? CreationDate { get; set; }
        public long? MainServiceProviderId { get; set; }
        public string KeyWordsInEnglish { get; set; }
        public string KeyWordsInArabic { get; set; }
        public string AddressInArabic { get; set; }
        public string ProviderCode { get; set; }
        public int? MaximumUsageCode { get; set; }
        public string WebsiteUrl { get; set; }
        public string FacebookUrl { get; set; }
        public string InstagramUrl { get; set; }

        public long? ProvidersCategoriesId { get; set; }
        public ProvidersCategories ProvidersCategories { get; set; }

    

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var providers = obj as Providers;
            if (providers?.Id == null || providers?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, providers.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Providers{" +
                    $"ID='{Id}'" +
                    $", ProviderNameInEnglish='{ProviderNameInEnglish}'" +
                    $", ProviderNameInArabic='{ProviderNameInArabic}'" +
                    $", Latitude='{Latitude}'" +
                    $", Longitude='{Longitude}'" +
                    $", PhoneNumber='{PhoneNumber}'" +
                    $", Email='{Email}'" +
                    $", ProviderImageUrl='{ProviderImageUrl}'" +
                    $", Address='{Address}'" +
                    $", IsActive='{IsActive}'" +
                    $", IsWeChooseForYou='{IsWeChooseForYou}'" +
                    $", IsVip='{IsVip}'" +
                    $", Note='{Note}'" +
                    $", ItWillHaveSubProviders='{ItWillHaveSubProviders}'" +
                    $", AddedBy='{AddedBy}'" +
                    $", CreationDate='{CreationDate}'" +
                    $", MainServiceProviderId='{MainServiceProviderId}'" +
                    $", KeyWordsInEnglish='{KeyWordsInEnglish}'" +
                    $", KeyWordsInArabic='{KeyWordsInArabic}'" +
                    $", AddressInArabic='{AddressInArabic}'" +
                    $", ProviderCode='{ProviderCode}'" +
                    $", MaximumUsageCode='{MaximumUsageCode}'" +
                    $", WebsiteUrl='{WebsiteUrl}'" +
                    $", FacebookUrl='{FacebookUrl}'" +
                    $", InstagramUrl='{InstagramUrl}'" +
                    "}";
        }
    }
}
