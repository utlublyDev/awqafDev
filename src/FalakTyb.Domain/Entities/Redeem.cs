using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace awqaf.Domain
{
    [Table("redeem")]
    public class Redeem : BaseEntity<long>
    {
        [Required]
        public long? UserId { get; set; }
        [Required]
        public long ProviderId { get; set; }
        public long OfferId { get; set; }
        public string Code { get; set; }
        public DateTime? Date { get; set; }
        public int? CountCode { get; set; }

       

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var redeem = obj as Redeem;
            if (redeem?.Id == null || redeem?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, redeem.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Redeem{" +
                    $"ID='{Id}'" +
                    $", UserId='{UserId}'" +
                    $", ProviderId='{ProviderId}'" +
                    $", OfferId='{OfferId}'" +
                    $", Code='{Code}'" +
                    $", Date='{Date}'" +
                    $", CountCode='{CountCode}'" +
                    "}";
        }
    }
}
