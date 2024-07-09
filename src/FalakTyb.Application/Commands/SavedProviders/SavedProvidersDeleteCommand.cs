using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class SavedProvidersDeleteCommand : IRequest<Unit>
    {
        public long Id { get; set; }
         public string AwaqafUserId { get; set; }
    }
}
