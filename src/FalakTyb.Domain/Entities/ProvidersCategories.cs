using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace awqaf.Domain
{
    [Table("providers_categories")]
    public class ProvidersCategories : BaseEntity<long>
    {
        [Required]
        public string ProvidersCategorieNameInEnglish { get; set; }
        [Required]
        public string ProvidersCategorieNameInArabic { get; set; }
        public string ProvidersCategorieIconUrl { get; set; }
        public bool? ItWillHaveHoldingCompaniesb { get; set; }
        public string AddedBy { get; set; }
        public bool? Status { get; set; }
        public DateTime? CreationDate { get; set; }

       

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var providersCategories = obj as ProvidersCategories;
            if (providersCategories?.Id == null || providersCategories?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, providersCategories.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "ProvidersCategories{" +
                    $"ID='{Id}'" +
                    $", ProvidersCategorieNameInEnglish='{ProvidersCategorieNameInEnglish}'" +
                    $", ProvidersCategorieNameInArabic='{ProvidersCategorieNameInArabic}'" +
                    $", ProvidersCategorieIconUrl='{ProvidersCategorieIconUrl}'" +
                    $", ItWillHaveHoldingCompaniesb='{ItWillHaveHoldingCompaniesb}'" +
                    $", AddedBy='{AddedBy}'" +
                    $", Status='{Status}'" +
                    $", CreationDate='{CreationDate}'" +
                    "}";
        }
    }
}
