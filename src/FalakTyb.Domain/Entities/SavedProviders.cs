using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace awqaf.Domain
{
    [Table("saved_providers")]
    public class SavedProviders : BaseEntity<long>
    {
        [Required]
        public string UserIdAwqaf { get; set; }
        public string ProviderId { get; set; }
        public string SubProviderId { get; set; }
        public string OfferId { get; set; }
        public bool? IsOffer { get; set; }

      

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var savedProviders = obj as SavedProviders;
            if (savedProviders?.Id == null || savedProviders?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, savedProviders.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "SavedProviders{" +
                    $"ID='{Id}'" +
                    $", UserIdAwqaf='{UserIdAwqaf}'" +
                    $", ProviderId='{ProviderId}'" +
                    $", SubProviderId='{SubProviderId}'" +
                    $", OfferId='{OfferId}'" +
                    $", IsOffer='{IsOffer}'" +
                    "}";
        }
    }
}
