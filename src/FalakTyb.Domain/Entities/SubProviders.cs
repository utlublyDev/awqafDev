using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace awqaf.Domain
{
    [Table("sub_providers")]
    public class SubProviders : BaseEntity<long>
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
        public string AddedBy { get; set; }
        public bool? ItWillHaveHoldingCompanies { get; set; }
        public DateTime? CreationDate { get; set; }


        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var subProviders = obj as SubProviders;
            if (subProviders?.Id == null || subProviders?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, subProviders.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "SubProviders{" +
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
                    $", AddedBy='{AddedBy}'" +
                    $", ItWillHaveHoldingCompanies='{ItWillHaveHoldingCompanies}'" +
                    $", CreationDate='{CreationDate}'" +
                    "}";
        }
    }
}
